
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getServicesByCategory, serviceProviders, formatCurrency } from "@/data/mockData";
import { ServiceCategory, Service } from "@/types";
import { Link } from "react-router-dom";
import { Search, MapPin, Star } from "lucide-react";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as ServiceCategory || "";
  
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  useEffect(() => {
    let filteredServices: Service[] = [];
    
    // Get all services from all providers
    const allServices = serviceProviders.flatMap(provider => provider.services);
    
    // Filter by category if selected
    if (selectedCategory) {
      filteredServices = allServices.filter(service => service.category === selectedCategory);
    } else {
      filteredServices = [...allServices];
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredServices = filteredServices.filter(service => 
        service.name.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filteredServices = filteredServices.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    setServices(filteredServices);
  }, [selectedCategory, searchQuery, priceRange]);
  
  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as ServiceCategory || "");
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  // Get provider for a service
  const getProviderForService = (serviceId: string) => {
    return serviceProviders.find(provider => 
      provider.services.some(service => service.id === serviceId)
    );
  };
  
  return (
    <Layout>
      <div className="bg-glow-50 py-12">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl font-bold text-glow-800 mb-4 md:text-4xl">
              Discover Beauty Services
            </h1>
            <p className="text-lg text-gray-600">
              Find and book professional beauty services delivered to your doorstep
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-4">
              {/* Filters sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Categories</label>
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Categories</SelectItem>
                            {Object.values(ServiceCategory).map(category => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price Range</label>
                        <div className="pt-4">
                          <Slider
                            defaultValue={[0, 500]}
                            max={500}
                            step={10}
                            onValueChange={handlePriceChange}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">${priceRange[0]}</span>
                          <span className="text-sm text-gray-500">${priceRange[1]}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex items-center space-x-2">
                          {[4, 3, 2, 1].map(rating => (
                            <label key={rating} className="flex items-center space-x-1 text-sm">
                              <input type="radio" name="rating" className="form-radio" />
                              <span>{rating}+ ⭐</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Service Type</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="form-checkbox" defaultChecked />
                            <span>In-home service</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="form-checkbox" />
                            <span>At salon/studio</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Services list */}
              <div className="md:col-span-3">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search services..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                
                {services.length === 0 ? (
                  <Card className="text-center p-8">
                    <h3 className="text-lg font-medium mb-2">No services found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
                    <Button onClick={() => {
                      setSelectedCategory("");
                      setSearchQuery("");
                      setPriceRange([0, 500]);
                    }}>
                      Clear All Filters
                    </Button>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(service => {
                      const provider = getProviderForService(service.id);
                      return (
                        <Card key={service.id} className="overflow-hidden h-full hover:shadow-md transition-all">
                          <div className="relative h-40 bg-glow-100">
                            {service.images && service.images.length > 0 ? (
                              <img
                                src={`https://source.unsplash.com/random/300x200/?${service.category}`}
                                alt={service.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-3xl">
                                  {service.category === ServiceCategory.HAIR && "💇‍♀️"}
                                  {service.category === ServiceCategory.MAKEUP && "💄"}
                                  {service.category === ServiceCategory.NAILS && "💅"}
                                  {service.category === ServiceCategory.FACIAL && "✨"}
                                  {service.category === ServiceCategory.MASSAGE && "💆‍♀️"}
                                  {service.category === ServiceCategory.EYEBROWS && "👁️"}
                                  {service.category === ServiceCategory.WAXING && "🧴"}
                                  {service.category === ServiceCategory.OTHER && "🌟"}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded-full text-xs font-medium text-glow-700">
                              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                            </div>
                          </div>
                          
                          <CardContent className="p-4 flex flex-col h-[calc(100%-160px)]">
                            <h3 className="font-semibold mb-1 text-glow-800">{service.name}</h3>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{service.description}</p>
                            
                            {provider && (
                              <div className="mt-2 mb-auto">
                                <div className="flex items-center text-sm mb-1">
                                  <div className="h-6 w-6 rounded-full bg-glow-100 flex items-center justify-center mr-2">
                                    <span className="text-xs">{provider.name.charAt(0)}</span>
                                  </div>
                                  <span className="text-gray-700">{provider.name}</span>
                                </div>
                                
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{provider.location.city}, {provider.location.state}</span>
                                  <div className="ml-2 flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="ml-1">{provider.rating}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="border-t border-glow-100 mt-3 pt-3 flex items-center justify-between">
                              <div className="font-semibold text-glow-800">
                                {formatCurrency(service.price)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {service.durationMinutes} min
                              </div>
                            </div>
                            
                            <Link to={`/services/${service.id}`} className="mt-3">
                              <Button className="w-full">Book Now</Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
