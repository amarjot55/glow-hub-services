
import { 
  ServiceProvider, 
  Client, 
  UserRole, 
  ServiceCategory, 
  Service, 
  PortfolioItem, 
  Availability,
  Booking,
  BookingStatus,
  Review
} from '@/types';

// Photos: Pexels (free licence). Avatars: DiceBear API.
export const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fde2e4,fad2e1,e2ece9,dfe7fd`;

export const CATEGORY_IMAGES: Partial<Record<ServiceCategory, string>> = {
  [ServiceCategory.MAKEUP]: pexels(3813896),
  [ServiceCategory.HAIR]: pexels(3992863),
  [ServiceCategory.NAILS]: pexels(5238012),
  [ServiceCategory.FACIAL]: pexels(4207234),
  [ServiceCategory.MASSAGE]: pexels(4085450),
};

const weekdays = (providerId: string, start = '09:00', end = '19:00'): Availability[] =>
  [1, 2, 3, 4, 5, 6].map((d) => ({ id: `${providerId}-a${d}`, providerId, dayOfWeek: d, startTime: start, endTime: end, isAvailable: true }));

const svc = (id: string, providerId: string, name: string, description: string, category: ServiceCategory, price: number, durationMinutes: number, photoIds: number[]): Service => ({
  id, providerId, name, description, category, price, durationMinutes, inHomeService: true,
  images: photoIds.map((x) => pexels(x)), createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-06-15'),
});

const work = (id: string, providerId: string, title: string, description: string, category: ServiceCategory, photoId: number): PortfolioItem => ({
  id, providerId, title, description, imageUrl: pexels(photoId, 600), category, createdAt: new Date('2025-03-10'),
});

const provider = (p: Omit<ServiceProvider, 'role' | 'createdAt' | 'updatedAt' | 'availability' | 'verified'> & { verified?: boolean }): ServiceProvider => ({
  ...p, role: UserRole.SERVICE_PROVIDER, verified: p.verified ?? true, availability: weekdays(p.id),
  createdAt: new Date('2025-01-10'), updatedAt: new Date('2025-09-15'),
});

// Mock service providers (Delhi NCR, Mumbai, Bengaluru)
export const serviceProviders: ServiceProvider[] = [
  provider({
    id: 'sp1', name: 'Priya Sharma', email: 'priya@glowhub.in', phone: '+91 98110 20141', avatar: avatar('Priya Sharma'),
    bio: 'Certified bridal and party makeup artist with 8 years of experience. HD and airbrush looks that stay put through long Indian weddings.',
    experience: 8,
    location: { address: 'DLF Phase 4', city: 'Gurugram', state: 'Haryana', zipCode: '122009', coordinates: { latitude: 28.4669, longitude: 77.0829 } },
    services: [
      svc('s1', 'sp1', 'Bridal Makeup (HD)', 'Trial session, wedding-day HD makeup, hairstyling and a touch-up kit.', ServiceCategory.MAKEUP, 14999, 180, [19301315, 3813896]),
      svc('s2', 'sp1', 'Party & Engagement Makeup', 'Full-face makeup for parties, sangeet, engagements and photoshoots.', ServiceCategory.MAKEUP, 3499, 75, [7582563]),
    ],
    portfolio: [
      work('p1', 'sp1', 'Soft-glam bride', 'Dewy HD base with a rose-gold eye for a day wedding', ServiceCategory.MAKEUP, 19301315),
      work('p2', 'sp1', 'Sangeet night glam', 'Bold eyes and a matte lip for an evening function', ServiceCategory.MAKEUP, 7290749),
      work('p7', 'sp1', 'Engagement look', 'Lightweight base, defined lashes', ServiceCategory.MAKEUP, 1383537),
    ],
    rating: 4.9, reviewCount: 212,
  }),
  provider({
    id: 'sp2', name: 'Ananya Kapoor', email: 'ananya@glowhub.in', phone: '+91 98110 20142', avatar: avatar('Ananya Kapoor'),
    bio: 'Senior stylist trained at a Delhi academy. Precision cuts, global colour and balayage at home with salon-grade products.',
    experience: 6,
    location: { address: 'Hauz Khas', city: 'New Delhi', state: 'Delhi', zipCode: '110016', coordinates: { latitude: 28.5494, longitude: 77.2001 } },
    services: [
      svc('s3', 'sp2', 'Haircut & Blow-dry', 'Consultation, wash, precision cut and blow-dry styling.', ServiceCategory.HAIR, 1299, 60, [3992863, 3356170]),
      svc('s4', 'sp2', 'Balayage / Global Colour', 'Hand-painted balayage or global colour with toner and bond care.', ServiceCategory.HAIR, 6999, 180, [4981476, 6503329]),
    ],
    portfolio: [
      work('p3', 'sp2', 'Caramel balayage', 'Soft, low-maintenance blend', ServiceCategory.HAIR, 4981476),
      work('p4', 'sp2', 'Textured lob', 'Shoulder-length cut with soft layers', ServiceCategory.HAIR, 3065171),
      work('p8', 'sp2', 'Bouncy blow-dry', 'Volume blow-dry for a party', ServiceCategory.HAIR, 3065209),
    ],
    rating: 4.8, reviewCount: 168,
  }),
  provider({
    id: 'sp3', name: 'Meera Iyer', email: 'meera@glowhub.in', phone: '+91 98110 20143', avatar: avatar('Meera Iyer'),
    bio: 'Nail technician specialising in gel extensions and hand-painted nail art. Hospital-grade sterilisation on every visit.',
    experience: 5,
    location: { address: 'Sector 50', city: 'Noida', state: 'Uttar Pradesh', zipCode: '201301', coordinates: { latitude: 28.5706, longitude: 77.3628 } },
    services: [
      svc('s5', 'sp3', 'Gel Manicure', 'Shaping, cuticle care and long-lasting gel polish.', ServiceCategory.NAILS, 999, 45, [16363470, 5238012]),
      svc('s6', 'sp3', 'Nail Art & Extensions', 'Gel or acrylic extensions with custom hand-painted art.', ServiceCategory.NAILS, 1999, 90, [6429663, 3738369]),
    ],
    portfolio: [
      work('p5', 'sp3', 'Pastel florals', 'Hand-painted spring florals', ServiceCategory.NAILS, 6429663),
      work('p6', 'sp3', 'Minimal monochrome', 'Black-and-white line art', ServiceCategory.NAILS, 3738369),
      work('p9', 'sp3', 'Classic red', 'Glossy gel red, almond shape', ServiceCategory.NAILS, 3997386),
    ],
    rating: 4.7, reviewCount: 134,
  }),
  provider({
    id: 'sp4', name: 'Ritika Malhotra', email: 'ritika@glowhub.in', phone: '+91 98110 20144', avatar: avatar('Ritika Malhotra'),
    bio: 'Licensed aesthetician. Hydra facials, clean-ups and skin-type consultations using dermatologist-approved products.',
    experience: 7,
    location: { address: 'Sector 56', city: 'Gurugram', state: 'Haryana', zipCode: '122011', coordinates: { latitude: 28.4231, longitude: 77.1004 } },
    services: [
      svc('s7', 'sp4', 'Hydra Facial', 'Deep cleanse, exfoliation, extraction and hydrating serum infusion.', ServiceCategory.FACIAL, 2499, 75, [5069612, 19242406]),
      svc('s8', 'sp4', 'Clean-up & Detan', 'Quick clean-up with detan pack for glowing skin.', ServiceCategory.FACIAL, 1199, 45, [12115041]),
    ],
    portfolio: [
      work('p10', 'sp4', 'Pre-wedding skin prep', '4-session glow plan for a bride', ServiceCategory.FACIAL, 4207234),
      work('p11', 'sp4', 'Clay mask detox', 'Oil-control treatment for combination skin', ServiceCategory.FACIAL, 12115041),
    ],
    rating: 4.8, reviewCount: 97,
  }),
  provider({
    id: 'sp5', name: 'Kavya Nair', email: 'kavya@glowhub.in', phone: '+91 98110 20145', avatar: avatar('Kavya Nair'),
    bio: 'Certified massage therapist trained in Kerala Ayurveda and Swedish techniques. Brings a portable table, oils and fresh linen.',
    experience: 9,
    location: { address: 'Bandra West', city: 'Mumbai', state: 'Maharashtra', zipCode: '400050', coordinates: { latitude: 19.0596, longitude: 72.8295 } },
    services: [
      svc('s9', 'sp5', 'Swedish Massage (60 min)', 'Full-body relaxing massage with aromatherapy oil.', ServiceCategory.MASSAGE, 1999, 60, [4085450, 3865608]),
      svc('s10', 'sp5', 'Abhyanga Ayurvedic Massage', 'Warm herbal-oil Kerala massage for stress and sleep.', ServiceCategory.MASSAGE, 2799, 90, [10894305]),
    ],
    portfolio: [
      work('p12', 'sp5', 'At-home spa setup', 'Table, linen and oils set up in 10 minutes', ServiceCategory.MASSAGE, 3865608),
    ],
    rating: 4.9, reviewCount: 156,
  }),
];

// Mock client data
export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Neha Verma',
    email: 'neha@example.com',
    phone: '+91 98765 11111',
    avatar: avatar('Neha Verma'),
    role: UserRole.CLIENT,
    addresses: [
      {
        address: 'Tower B, DLF Park Place',
        city: 'Gurugram',
        state: 'Haryana',
        zipCode: '122002',
        coordinates: { latitude: 28.4595, longitude: 77.0266 },
        isDefault: true
      }
    ],
    favoriteProviders: ['sp1', 'sp3'],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: 'c2',
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    phone: '+91 98765 22222',
    avatar: avatar('Rohan Mehta'),
    role: UserRole.CLIENT,
    addresses: [
      {
        address: 'Vasant Vihar',
        city: 'New Delhi',
        state: 'Delhi',
        zipCode: '110057',
        coordinates: { latitude: 28.5603, longitude: 77.1571 },
        isDefault: true
      }
    ],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15')
  }
];

// Mock bookings
export const bookings: Booking[] = [
  {
    id: 'b1',
    clientId: 'c1',
    providerId: 'sp1',
    serviceId: 's2',
    status: BookingStatus.COMPLETED,
    dateTime: new Date('2023-06-15T14:00:00'),
    duration: 60,
    location: {
      address: 'Tower B, DLF Park Place',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122002',
      coordinates: { latitude: 28.4595, longitude: 77.0266 }
    },
    price: 3499,
    platformFee: 700, // 20% of price
    totalAmount: 4199,
    notes: 'Party makeup for an anniversary dinner',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-16')
  },
  {
    id: 'b2',
    clientId: 'c1',
    providerId: 'sp3',
    serviceId: 's5',
    status: BookingStatus.CONFIRMED,
    dateTime: new Date('2023-07-20T11:00:00'),
    duration: 60,
    location: {
      address: 'Tower B, DLF Park Place',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122002',
      coordinates: { latitude: 28.4595, longitude: 77.0266 }
    },
    price: 999,
    platformFee: 200, // 20% of price
    totalAmount: 1199,
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-07-15')
  }
];

// Mock reviews
export const reviews: Review[] = [
  {
    id: 'r1',
    bookingId: 'b1',
    clientId: 'c1',
    providerId: 'sp1',
    rating: 5,
    comment: 'Priya did an amazing job with my makeup! She was punctual, professional, and the makeup lasted all night. Highly recommend!',
    createdAt: new Date('2023-06-16')
  }
];

// Helper function to get services by category
export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return serviceProviders.flatMap(provider => 
    provider.services.filter(service => service.category === category)
  );
};

// Helper function to get provider by ID
export const getProviderById = (id: string): ServiceProvider | undefined => {
  return serviceProviders.find(provider => provider.id === id);
};

// Helper function to get client by ID
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

// Helper function to get service by ID
export const getServiceById = (id: string): Service | undefined => {
  for (const provider of serviceProviders) {
    const service = provider.services.find(s => s.id === id);
    if (service) return service;
  }
  return undefined;
};

// Helper function to get bookings by client ID
export const getBookingsByClientId = (clientId: string): Booking[] => {
  return bookings.filter(booking => booking.clientId === clientId);
};

// Helper function to get bookings by provider ID
export const getBookingsByProviderId = (providerId: string): Booking[] => {
  return bookings.filter(booking => booking.providerId === providerId);
};

// Helper function to get reviews by provider ID
export const getReviewsByProviderId = (providerId: string): Review[] => {
  return reviews.filter(review => review.providerId === providerId);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper function to format time
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Function to calculate distance between two coordinates (in kilometers)
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
