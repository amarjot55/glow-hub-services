
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-glow-800 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-glow-700 blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 -left-24 w-64 h-64 rounded-full bg-glow-600 blur-3xl opacity-20"></div>
      </div>
      
      <div className="container px-4 py-16 mx-auto relative z-10 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-10 items-center md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready for a Glow Up?
              </h2>
              <p className="text-lg text-glow-100">
                Book your first beauty service today and experience the convenience of at-home salon treatments from verified professionals.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-glow-800 hover:bg-glow-100">
                    Book Now
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Join as a Pro
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5069612/pexels-photo-5069612.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Woman getting professional makeup service"
                className="rounded-lg shadow-lg border-4 border-white/10"
              />
              
              {/* Mini quote card */}
              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg text-glow-800 max-w-[200px]">
                <p className="text-sm font-medium">
                  "The best decision I made was booking through GlowHub!"
                </p>
                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-xs font-medium">Jessica T.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
