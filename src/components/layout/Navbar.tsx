
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Home, 
  Search,
  Calendar, 
  User, 
  Bell, 
  Menu,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b border-glow-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-glow-700">
            Glow<span className="text-glow-500">Hub</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive('/') ? 'default' : 'ghost'} 
              className={isActive('/') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
            >
              Home
            </Button>
          </Link>
          
          <Link to="/services">
            <Button 
              variant={isActive('/services') ? 'default' : 'ghost'}
              className={isActive('/services') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
            >
              Services
            </Button>
          </Link>
          
          {!user ? (
            <>
              <Link to="/login">
                <Button 
                  variant={isActive('/login') ? 'default' : 'ghost'}
                  className={isActive('/login') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button>Join Now</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/bookings">
                <Button 
                  variant={isActive('/bookings') ? 'default' : 'ghost'}
                  className={isActive('/bookings') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
                >
                  My Bookings
                </Button>
              </Link>
              
              {user.role === UserRole.SERVICE_PROVIDER && (
                <Link to="/provider/dashboard">
                  <Button 
                    variant={isActive('/provider/dashboard') ? 'default' : 'ghost'}
                    className={isActive('/provider/dashboard') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
                  >
                    Provider Dashboard
                  </Button>
                </Link>
              )}
              
              <Link to="/messages">
                <Button 
                  variant={isActive('/messages') ? 'default' : 'ghost'}
                  className={isActive('/messages') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
                >
                  Messages
                </Button>
              </Link>
              
              <Link to="/profile">
                <Button 
                  variant={isActive('/profile') ? 'default' : 'ghost'} 
                  className={isActive('/profile') ? 'bg-glow-100 text-glow-800 hover:bg-glow-200' : ''}
                >
                  Profile
                </Button>
              </Link>
              
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col h-full p-0">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-glow-700">
                  Glow<span className="text-glow-500">Hub</span>
                </span>
              </div>
              {user && (
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-glow-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-glow-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
            <nav className="flex-1 overflow-auto px-6 py-4 space-y-2">
              <Link 
                to="/" 
                className={`flex items-center p-3 rounded-md ${isActive('/') ? 'bg-glow-100 text-glow-700' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                Home
              </Link>
              <Link 
                to="/services" 
                className={`flex items-center p-3 rounded-md ${isActive('/services') ? 'bg-glow-100 text-glow-700' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Search className="h-5 w-5 mr-3" />
                Services
              </Link>
              {!user ? (
                <>
                  <Link 
                    to="/login" 
                    className={`flex items-center p-3 rounded-md ${isActive('/login') ? 'bg-glow-100 text-glow-700' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center p-3 rounded-md bg-primary text-white"
                    onClick={() => setOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Join Now
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/bookings" 
                    className={`flex items-center p-3 rounded-md ${isActive('/bookings') ? 'bg-glow-100 text-glow-700' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    My Bookings
                  </Link>
                  {user.role === UserRole.SERVICE_PROVIDER && (
                    <Link 
                      to="/provider/dashboard" 
                      className={`flex items-center p-3 rounded-md ${isActive('/provider/dashboard') ? 'bg-glow-100 text-glow-700' : ''}`}
                      onClick={() => setOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3" />
                      Provider Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/messages" 
                    className={`flex items-center p-3 rounded-md ${isActive('/messages') ? 'bg-glow-100 text-glow-700' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5 mr-3" />
                    Messages
                  </Link>
                  <Link 
                    to="/notifications" 
                    className={`flex items-center p-3 rounded-md ${isActive('/notifications') ? 'bg-glow-100 text-glow-700' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`flex items-center p-3 rounded-md ${isActive('/profile') ? 'bg-glow-100 text-glow-700' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center p-3 rounded-md w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
