
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceProviders } from "@/data/mockData";
import { Star, MapPin } from "lucide-react";

export default function FeaturedProviders() {
  // Use the first 4 providers from our mock data
  const featuredProviders = serviceProviders.slice(0, 4);

  return (
    <section className="py-16 bg-glow-50">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-glow-800 md:text-4xl">
            Meet Our Top Beauty Professionals
          </h2>
          <p className="text-lg text-gray-600">
            Experienced and highly-rated beauty experts ready to serve you at home
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden border-glow-100 hover:shadow-md transition-shadow">
              <div className="relative">
                {/* Use the first portfolio image or a placeholder */}
                <img
                  src={provider.portfolio[0]?.imageUrl ?? provider.services[0]?.images?.[0]}
                  loading="lazy"
                  alt={provider.name}
                  className="object-cover w-full h-48"
                />
                {provider.verified && (
                  <div className="absolute top-3 right-3 bg-white py-1 px-2 rounded-full text-xs font-medium text-glow-700 shadow-sm border border-glow-100 flex items-center space-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.3 12C21.3 17.0751 17.0751 21.3 12 21.3C6.92487 21.3 2.7 17.0751 2.7 12C2.7 6.92487 6.92487 2.7 12 2.7C17.0751 2.7 21.3 6.92487 21.3 12Z" stroke="#a040e5" strokeWidth="2"/>
                      <path d="M16 9L10.5 14.5L8 12" stroke="#a040e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Verified</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    {provider.avatar && <img src={provider.avatar} alt="" className="h-8 w-8 rounded-full border border-glow-100" />}
                    <h3 className="text-lg font-semibold text-glow-800">{provider.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{provider.bio}</p>
                </div>
                
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium text-gray-800">{provider.rating.toFixed(1)}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-500">{provider.reviewCount} reviews</span>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-1 mt-0.5" />
                  <span className="text-sm text-gray-500">
                    {provider.location.city}, {provider.location.state}
                  </span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-glow-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Services from </span>
                      <span className="font-medium text-glow-800">
                        ${Math.min(...provider.services.map(s => s.price))}
                      </span>
                    </div>
                    <Link to={`/providers/${provider.id}`}>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/providers">
            <Button size="lg" variant="outline">View All Professionals</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
