// Mock REST layer for the prototype. Each call resolves after a short, realistic
// delay so loading states behave like a real backend. Swap the bodies for fetch()
// calls to /api/* when a backend exists; the signatures stay the same.
import { serviceProviders, getProviderById, calculateDistance } from '@/data/mockData';
import type { ServiceProvider, Service } from '@/types';

const latency = () => new Promise((r) => setTimeout(r, 250 + Math.random() * 350));

export interface ProviderQuery {
  q?: string;
  near?: { lat: number; lng: number };
}

export interface ProviderWithDistance extends ServiceProvider {
  distanceKm?: number;
}

export async function listProviders({ q = '', near }: ProviderQuery = {}): Promise<ProviderWithDistance[]> {
  await latency();
  const term = q.trim().toLowerCase();
  let list: ProviderWithDistance[] = serviceProviders.filter((p) => {
    const hay = `${p.name} ${p.location.city} ${p.services.map((s) => `${s.name} ${s.category}`).join(' ')}`.toLowerCase();
    return !term || hay.includes(term);
  });
  if (near) {
    list = list
      .map((p) => ({
        ...p,
        distanceKm: p.location.coordinates
          ? calculateDistance(near.lat, near.lng, p.location.coordinates.latitude, p.location.coordinates.longitude)
          : undefined,
      }))
      .sort((a, b) => (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9));
  }
  return list;
}

export async function getProvider(id: string): Promise<ServiceProvider | null> {
  await latency();
  return getProviderById(id) ?? null;
}

export async function listServices(): Promise<(Service & { providerName: string })[]> {
  await latency();
  return serviceProviders.flatMap((p) => p.services.map((s) => ({ ...s, providerName: p.name })));
}

// Real public API: free reverse geocoding (no key, CORS enabled).
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
  );
  if (!res.ok) throw new Error('Geocoding failed');
  const d = await res.json();
  return [d.locality, d.city, d.principalSubdivision, d.postcode].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');
}

export function getBrowserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Location not supported on this device'));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => reject(new Error('Location permission denied')),
      { timeout: 8000 },
    );
  });
}
