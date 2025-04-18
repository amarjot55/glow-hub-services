
// User roles
export enum UserRole {
  CLIENT = 'client',
  SERVICE_PROVIDER = 'serviceProvider',
  ADMIN = 'admin',
}

// Service category types
export enum ServiceCategory {
  HAIR = 'hair',
  MAKEUP = 'makeup',
  NAILS = 'nails',
  FACIAL = 'facial',
  MASSAGE = 'massage',
  EYEBROWS = 'eyebrows',
  EYELASHES = 'eyelashes',
  WAXING = 'waxing',
  OTHER = 'other'
}

// Base user interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service provider profile
export interface ServiceProvider extends User {
  role: UserRole.SERVICE_PROVIDER;
  bio?: string;
  experience?: number; // in years
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  services: Service[];
  portfolio: PortfolioItem[];
  availability: Availability[];
  rating: number;
  reviewCount: number;
  verified: boolean;
}

// Client profile
export interface Client extends User {
  role: UserRole.CLIENT;
  addresses: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    isDefault: boolean;
  }[];
  favoriteProviders?: string[]; // provider IDs
}

// Service
export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  inHomeService: boolean;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio item
export interface PortfolioItem {
  id: string;
  providerId: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: ServiceCategory;
  createdAt: Date;
}

// Provider availability
export interface Availability {
  id: string;
  providerId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  isAvailable: boolean;
}

// Booking
export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  dateTime: Date;
  duration: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  platformFee: number;
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking status
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'noShow'
}

// Review
export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  providerId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

// Authentication context
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Registration data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

// Login data
export interface LoginData {
  email: string;
  password: string;
}
