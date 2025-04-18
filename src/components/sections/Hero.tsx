
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SearchIcon, CalendarIcon, UserIcon } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-glow-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-glow-100 blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-salon-100 blur-3xl opacity-40"></div>
      </div>
      
      <div className="container relative px-4 py-20 mx-auto md:py-32 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-glow-950 sm:text-5xl md:text-6xl">
              Beauty Services <span className="text-primary">At Your Doorstep</span>
            </h1>
            <p className="text-lg text-gray-600">
              Connect with top beauty professionals for personalized salon services in the comfort of your home. Book services from verified experts in hair styling, makeup, nail care, facials, and more.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Now
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as a Pro
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-glow-100">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-glow-100 rounded-full">
                  <SearchIcon className="w-6 h-6 text-glow-700" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Find top beauty pros
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-glow-100 rounded-full">
                  <CalendarIcon className="w-6 h-6 text-glow-700" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Book with ease
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-glow-100 rounded-full">
                  <UserIcon className="w-6 h-6 text-glow-700" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Get pampered at home
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-glow-200/50">
              <img
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Beauty professional providing service"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Rating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-glow-100 max-w-[200px]">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-bold text-gray-800">4.9/5</span>
              </div>
              <p className="text-xs text-gray-600">
                "Amazing experience! The stylist was professional and the service was top-notch."
              </p>
              <p className="mt-2 text-xs font-medium text-glow-700">
                - Sarah J., New York
              </p>
            </div>

            {/* Service card */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-glow-100">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-glow-100 rounded-full">
                  <span className="text-sm font-medium text-glow-700">💇‍♀️</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Haircut & Style</h3>
                  <p className="text-xs text-gray-500">45+ professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
