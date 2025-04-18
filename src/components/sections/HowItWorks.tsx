
import { 
  Search, 
  Calendar, 
  CreditCard, 
  ThumbsUp 
} from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

function Step({ icon, title, description, number }: StepProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-primary rounded-full">
        {icon}
      </div>
      <div className="absolute top-0 right-0 -mr-3 -mt-3 bg-glow-100 text-glow-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-center text-glow-800">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-glow-800 md:text-4xl">
            How GlowHub Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting beauty services at your doorstep is simple
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (hidden on mobile) */}
          <div className="absolute hidden top-24 left-0 w-full h-0.5 bg-glow-100 md:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Step
              icon={<Search className="w-6 h-6" />}
              title="Find a Service"
              description="Browse and find the perfect beauty service based on your needs"
              number={1}
            />
            
            <Step
              icon={<Calendar className="w-6 h-6" />}
              title="Book Appointment"
              description="Select a convenient date and time that works for you"
              number={2}
            />
            
            <Step
              icon={<CreditCard className="w-6 h-6" />}
              title="Secure Payment"
              description="Pay securely online with various payment options"
              number={3}
            />
            
            <Step
              icon={<ThumbsUp className="w-6 h-6" />}
              title="Enjoy & Review"
              description="Enjoy your service and share your experience"
              number={4}
            />
          </div>
        </div>
        
        <div className="p-8 mt-16 text-center bg-glow-50 rounded-xl">
          <h3 className="mb-4 text-2xl font-semibold text-glow-800">Are you a beauty professional?</h3>
          <p className="max-w-2xl mx-auto mb-6 text-gray-600">
            Join GlowHub and connect with clients in your area. Grow your business by offering your services to more clients.
          </p>
          <div className="inline-flex items-center justify-center p-1 rounded-md bg-white">
            <div className="grid grid-cols-2 gap-1">
              <div className="px-4 py-2 text-sm font-medium text-center text-glow-800">
                Join as a professional
              </div>
              <div className="px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-md">
                Earn more money
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
