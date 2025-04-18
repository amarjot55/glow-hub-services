
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

// Mock service providers
export const serviceProviders: ServiceProvider[] = [
  {
    id: 'sp1',
    name: 'Emma Johnson',
    email: 'emma@glowhub.com',
    phone: '+12025550141',
    role: UserRole.SERVICE_PROVIDER,
    bio: 'Certified makeup artist with 8 years of experience specializing in bridal and special occasion makeup. I love creating natural, glowing looks that enhance your beauty.',
    experience: 8,
    location: {
      address: '123 Beauty St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    services: [
      {
        id: 's1',
        providerId: 'sp1',
        name: 'Bridal Makeup',
        description: 'Complete bridal makeup package including trial, day-of makeup, and touch-up kit.',
        category: ServiceCategory.MAKEUP,
        price: 250,
        durationMinutes: 120,
        inHomeService: true,
        images: ['/makeup1.jpg', '/makeup2.jpg'],
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15')
      },
      {
        id: 's2',
        providerId: 'sp1',
        name: 'Special Occasion Makeup',
        description: 'Full face makeup for special events, parties, photoshoots, etc.',
        category: ServiceCategory.MAKEUP,
        price: 120,
        durationMinutes: 60,
        inHomeService: true,
        images: ['/makeup3.jpg'],
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15')
      }
    ],
    portfolio: [
      {
        id: 'p1',
        providerId: 'sp1',
        title: 'Natural Bridal Look',
        description: 'Soft glam bridal makeup for summer wedding',
        imageUrl: '/portfolio1.jpg',
        category: ServiceCategory.MAKEUP,
        createdAt: new Date('2023-02-10')
      },
      {
        id: 'p2',
        providerId: 'sp1',
        title: 'Evening Glam',
        description: 'Dramatic evening look with bold eyes',
        imageUrl: '/portfolio2.jpg',
        category: ServiceCategory.MAKEUP,
        createdAt: new Date('2023-03-05')
      }
    ],
    availability: [
      {
        id: 'a1',
        providerId: 'sp1',
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        id: 'a2',
        providerId: 'sp1',
        dayOfWeek: 2, // Tuesday
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        id: 'a3',
        providerId: 'sp1',
        dayOfWeek: 3, // Wednesday
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        id: 'a4',
        providerId: 'sp1',
        dayOfWeek: 4, // Thursday
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        id: 'a5',
        providerId: 'sp1',
        dayOfWeek: 5, // Friday
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      }
    ],
    rating: 4.8,
    reviewCount: 24,
    verified: true,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 'sp2',
    name: 'Sophia Lee',
    email: 'sophia@glowhub.com',
    phone: '+12025550142',
    role: UserRole.SERVICE_PROVIDER,
    bio: 'Professional hairstylist with a passion for creative cuts and colors. Specialized in balayage, ombre, and modern styling techniques.',
    experience: 6,
    location: {
      address: '456 Style Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    services: [
      {
        id: 's3',
        providerId: 'sp2',
        name: 'Haircut & Styling',
        description: 'Customized haircut and styling based on face shape and hair texture.',
        category: ServiceCategory.HAIR,
        price: 85,
        durationMinutes: 60,
        inHomeService: true,
        images: ['/hair1.jpg'],
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date('2023-02-20')
      },
      {
        id: 's4',
        providerId: 'sp2',
        name: 'Balayage/Ombre',
        description: 'Customized hair coloring technique for a natural, sun-kissed look.',
        category: ServiceCategory.HAIR,
        price: 180,
        durationMinutes: 150,
        inHomeService: true,
        images: ['/hair2.jpg', '/hair3.jpg'],
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date('2023-02-20')
      }
    ],
    portfolio: [
      {
        id: 'p3',
        providerId: 'sp2',
        title: 'Beach Waves Balayage',
        description: 'Natural-looking beachy waves with caramel balayage',
        imageUrl: '/portfolio3.jpg',
        category: ServiceCategory.HAIR,
        createdAt: new Date('2023-03-15')
      },
      {
        id: 'p4',
        providerId: 'sp2',
        title: 'Modern Bob Cut',
        description: 'Sleek, asymmetrical bob with subtle layers',
        imageUrl: '/portfolio4.jpg',
        category: ServiceCategory.HAIR,
        createdAt: new Date('2023-04-02')
      }
    ],
    availability: [
      {
        id: 'a6',
        providerId: 'sp2',
        dayOfWeek: 2, // Tuesday
        startTime: '10:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: 'a7',
        providerId: 'sp2',
        dayOfWeek: 3, // Wednesday
        startTime: '10:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: 'a8',
        providerId: 'sp2',
        dayOfWeek: 4, // Thursday
        startTime: '10:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: 'a9',
        providerId: 'sp2',
        dayOfWeek: 6, // Saturday
        startTime: '09:00',
        endTime: '16:00',
        isAvailable: true
      }
    ],
    rating: 4.9,
    reviewCount: 37,
    verified: true,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-07-01')
  },
  {
    id: 'sp3',
    name: 'Maria Garcia',
    email: 'maria@glowhub.com',
    phone: '+12025550143',
    role: UserRole.SERVICE_PROVIDER,
    bio: 'Certified nail technician specializing in gel nails, nail art, and nail health. I use only premium, non-toxic products for beautiful, lasting results.',
    experience: 5,
    location: {
      address: '789 Nail Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918
      }
    },
    services: [
      {
        id: 's5',
        providerId: 'sp3',
        name: 'Gel Manicure',
        description: 'Long-lasting gel polish with nail prep, cuticle care, and hand massage.',
        category: ServiceCategory.NAILS,
        price: 45,
        durationMinutes: 60,
        inHomeService: true,
        images: ['/nails1.jpg'],
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2023-03-10')
      },
      {
        id: 's6',
        providerId: 'sp3',
        name: 'Nail Art Design',
        description: 'Custom nail art designs ranging from simple to elaborate.',
        category: ServiceCategory.NAILS,
        price: 70,
        durationMinutes: 90,
        inHomeService: true,
        images: ['/nails2.jpg', '/nails3.jpg'],
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2023-03-10')
      }
    ],
    portfolio: [
      {
        id: 'p5',
        providerId: 'sp3',
        title: 'Summer Floral Design',
        description: 'Vibrant floral nail art perfect for summer',
        imageUrl: '/portfolio5.jpg',
        category: ServiceCategory.NAILS,
        createdAt: new Date('2023-05-20')
      },
      {
        id: 'p6',
        providerId: 'sp3',
        title: 'Minimal French Tips',
        description: 'Modern take on classic french manicure',
        imageUrl: '/portfolio6.jpg',
        category: ServiceCategory.NAILS,
        createdAt: new Date('2023-06-10')
      }
    ],
    availability: [
      {
        id: 'a10',
        providerId: 'sp3',
        dayOfWeek: 1, // Monday
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      },
      {
        id: 'a11',
        providerId: 'sp3',
        dayOfWeek: 3, // Wednesday
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      },
      {
        id: 'a12',
        providerId: 'sp3',
        dayOfWeek: 5, // Friday
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      },
      {
        id: 'a13',
        providerId: 'sp3',
        dayOfWeek: 6, // Saturday
        startTime: '11:00',
        endTime: '16:00',
        isAvailable: true
      }
    ],
    rating: 4.7,
    reviewCount: 18,
    verified: true,
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-06-30')
  }
];

// Mock client data
export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+12025550145',
    role: UserRole.CLIENT,
    addresses: [
      {
        address: '123 Main St, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: {
          latitude: 40.7128,
          longitude: -74.0060
        },
        isDefault: true
      }
    ],
    favoriteProviders: ['sp1', 'sp3'],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: 'c2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+12025550146',
    role: UserRole.CLIENT,
    addresses: [
      {
        address: '456 Park Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        coordinates: {
          latitude: 34.0522,
          longitude: -118.2437
        },
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
      address: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    price: 120,
    platformFee: 24, // 20% of price
    totalAmount: 144,
    notes: 'Special occasion makeup for anniversary dinner',
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
      address: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    price: 45,
    platformFee: 9, // 20% of price
    totalAmount: 54,
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
    comment: 'Emma did an amazing job with my makeup! She was punctual, professional, and the makeup lasted all night. Highly recommend!',
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper function to format time
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
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
