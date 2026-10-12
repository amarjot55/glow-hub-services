
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage in this initial version)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function (will be replaced with real API calls later)
  const login = async (data: LoginData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mock successful login for demo purposes
      if (data.email === 'provider@example.com' && data.password === 'password') {
        const mockUser: User = {
          id: 'sp1',
          name: 'Emma Johnson',
          email: data.email,
          phone: '+1234567890',
          role: UserRole.SERVICE_PROVIDER,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else if (data.email === 'client@example.com' && data.password === 'password') {
        const mockUser: User = {
          id: 'c1',
          name: 'Sarah Johnson',
          email: data.email,
          phone: '+1987654321',
          role: UserRole.CLIENT,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function (will be replaced with real API calls later)
  const register = async (data: RegisterData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mock user creation
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
