import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { getServiceById, getProviderById } from '@/data/mockData';

// Demo-mode data layer: everything lives in localStorage so the full
// client <-> provider flow works without a backend.

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface DemoBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  date: string; // ISO date
  time: string;
  address: string;
  notes?: string;
  price: number;
  platformFee: number;
  status: BookingStatus;
  rating?: number;
  review?: string;
  createdAt: string;
}

export interface DemoMessage {
  id: string;
  providerId: string;
  clientId: string;
  from: 'client' | 'provider';
  text: string;
  at: string;
}

export interface DemoNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  link?: string;
  at: string;
  read: boolean;
}

interface State {
  bookings: DemoBooking[];
  messages: DemoMessage[];
  notifications: DemoNotification[];
  favourites: string[];
}

const KEY = 'glowhub-demo-v2';
const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();
const daysFromNow = (d: number) => {
  const x = new Date();
  x.setDate(x.getDate() + d);
  return x.toISOString();
};

function seed(): State {
  return {
    bookings: [
      {
        id: 'b1', serviceId: 's2', serviceName: 'Party & Engagement Makeup', providerId: 'sp1', providerName: 'Priya Sharma',
        clientId: 'c1', clientName: 'Neha Verma', date: daysFromNow(-12), time: '14:00', address: 'Tower B, DLF Park Place, Gurugram',
        notes: 'Anniversary dinner', price: 3499, platformFee: 700, status: 'completed', rating: 5,
        review: 'Punctual, professional, and the makeup lasted all night.', createdAt: daysFromNow(-15),
      },
      {
        id: 'b2', serviceId: 's5', serviceName: 'Gel Manicure', providerId: 'sp3', providerName: 'Meera Iyer',
        clientId: 'c1', clientName: 'Neha Verma', date: daysFromNow(3), time: '11:00', address: 'Tower B, DLF Park Place, Gurugram',
        price: 999, platformFee: 200, status: 'confirmed', createdAt: daysFromNow(-2),
      },
      {
        id: 'b3', serviceId: 's1', serviceName: 'Bridal Makeup (HD)', providerId: 'sp1', providerName: 'Priya Sharma',
        clientId: 'c2', clientName: 'Rohan Mehta', date: daysFromNow(6), time: '09:00', address: 'Vasant Vihar, New Delhi',
        notes: 'Sister’s wedding, plus 2 bridesmaids', price: 14999, platformFee: 3000, status: 'pending', createdAt: daysFromNow(-1),
      },
    ],
    messages: [
      { id: 'm1', providerId: 'sp3', clientId: 'c1', from: 'provider', text: 'Hi Neha! Looking forward to your manicure. Any colour in mind?', at: daysFromNow(-1) },
      { id: 'm2', providerId: 'sp1', clientId: 'c2', from: 'client', text: 'Hi Priya, can you bring extra lashes for the bridesmaids?', at: daysFromNow(-1) },
    ],
    notifications: [
      { id: 'n1', userId: 'c1', title: 'Booking confirmed', body: 'Meera Iyer confirmed your Gel Manicure.', link: '/bookings', at: daysFromNow(-1), read: false },
      { id: 'n2', userId: 'sp1', title: 'New booking request', body: 'Rohan Mehta requested Bridal Makeup (HD).', link: '/provider/dashboard', at: daysFromNow(-1), read: false },
    ],
    favourites: [],
  };
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return seed();
}

const AUTO_REPLIES = [
  'Thanks for your message! I will get back to you shortly.',
  'Sounds great, see you then!',
  'Noted. I will bring everything needed for the appointment.',
  'Happy to help. Let me know if anything changes.',
];

interface Ctx extends State {
  createBooking: (b: { serviceId: string; clientId: string; clientName: string; date: Date; time: string; address: string; notes?: string }) => DemoBooking | null;
  setStatus: (id: string, status: BookingStatus) => void;
  reschedule: (id: string, date: Date, time: string) => void;
  rate: (id: string, rating: number, review: string) => void;
  sendMessage: (providerId: string, clientId: string, from: 'client' | 'provider', text: string) => void;
  markAllRead: (userId: string) => void;
  markRead: (id: string) => void;
  toggleFavourite: (providerId: string) => void;
  resetDemo: () => void;
}

const DemoContext = createContext<Ctx | undefined>(undefined);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const notify = (s: State, userId: string, title: string, body: string, link?: string): State => ({
    ...s,
    notifications: [{ id: uid(), userId, title, body, link, at: now(), read: false }, ...s.notifications],
  });

  const createBooking: Ctx['createBooking'] = (b) => {
    const service = getServiceById(b.serviceId);
    if (!service) return null;
    const provider = getProviderById(service.providerId);
    const booking: DemoBooking = {
      id: uid(), serviceId: service.id, serviceName: service.name, providerId: service.providerId,
      providerName: provider?.name ?? 'Provider', clientId: b.clientId, clientName: b.clientName,
      date: b.date.toISOString(), time: b.time, address: b.address, notes: b.notes,
      price: service.price, platformFee: Math.round(service.price * 0.2), status: 'pending', createdAt: now(),
    };
    setState((s) => {
      let next: State = { ...s, bookings: [booking, ...s.bookings] };
      next = notify(next, service.providerId, 'New booking request', `${b.clientName} requested ${service.name}.`, '/provider/dashboard');
      next = notify(next, b.clientId, 'Booking requested', `${service.name} with ${booking.providerName} is awaiting confirmation.`, '/bookings');
      return next;
    });
    return booking;
  };

  const setStatus: Ctx['setStatus'] = (id, status) => {
    setState((s) => {
      const bk = s.bookings.find((x) => x.id === id);
      if (!bk) return s;
      let next: State = { ...s, bookings: s.bookings.map((x) => (x.id === id ? { ...x, status } : x)) };
      const label = { pending: 'pending', confirmed: 'confirmed', completed: 'completed', cancelled: 'cancelled' }[status];
      next = notify(next, bk.clientId, `Booking ${label}`, `${bk.serviceName} with ${bk.providerName} is now ${label}.`, '/bookings');
      next = notify(next, bk.providerId, `Booking ${label}`, `${bk.serviceName} for ${bk.clientName} is now ${label}.`, '/provider/dashboard');
      return next;
    });
  };

  const reschedule: Ctx['reschedule'] = (id, date, time) => {
    setState((s) => {
      const bk = s.bookings.find((x) => x.id === id);
      if (!bk) return s;
      const next: State = { ...s, bookings: s.bookings.map((x) => (x.id === id ? { ...x, date: date.toISOString(), time, status: 'pending' } : x)) };
      return notify(next, bk.providerId, 'Reschedule request', `${bk.clientName} moved ${bk.serviceName} to ${date.toDateString()} ${time}.`, '/provider/dashboard');
    });
  };

  const rate: Ctx['rate'] = (id, rating, review) => {
    setState((s) => {
      const bk = s.bookings.find((x) => x.id === id);
      if (!bk) return s;
      const next: State = { ...s, bookings: s.bookings.map((x) => (x.id === id ? { ...x, rating, review } : x)) };
      return notify(next, bk.providerId, 'New review', `${bk.clientName} rated ${bk.serviceName} ${rating}/5.`, '/provider/dashboard');
    });
  };

  const sendMessage: Ctx['sendMessage'] = (providerId, clientId, from, text) => {
    const msg: DemoMessage = { id: uid(), providerId, clientId, from, text, at: now() };
    setState((s) => notify({ ...s, messages: [...s.messages, msg] }, from === 'client' ? providerId : clientId, 'New message', text.slice(0, 80), '/messages'));
    // The other side replies automatically in demo mode.
    setTimeout(() => {
      const reply: DemoMessage = {
        id: uid(), providerId, clientId, from: from === 'client' ? 'provider' : 'client',
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)], at: now(),
      };
      setState((s) => ({ ...s, messages: [...s.messages, reply] }));
    }, 1200);
  };

  const markAllRead = (userId: string) =>
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => (n.userId === userId ? { ...n, read: true } : n)) }));
  const markRead = (id: string) =>
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) }));
  const toggleFavourite = (providerId: string) =>
    setState((s) => ({ ...s, favourites: s.favourites.includes(providerId) ? s.favourites.filter((f) => f !== providerId) : [...s.favourites, providerId] }));
  const resetDemo = useCallback(() => setState(seed()), []);

  return (
    <DemoContext.Provider value={{ ...state, createBooking, setStatus, reschedule, rate, sendMessage, markAllRead, markRead, toggleFavourite, resetDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used inside DemoStoreProvider');
  return ctx;
}

// The logged-in user's id in demo data: providers map to their provider profile.
export const demoUserId = (user: { id: string } | null) => user?.id ?? '';
