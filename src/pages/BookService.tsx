
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { getServiceById, getProviderById, formatCurrency } from "@/data/mockData";
import { Service, ServiceProvider } from "@/types";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Clock, MapPin, CalendarDays } from "lucide-react";

export default function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceById(serviceId);
      if (serviceData) {
        setService(serviceData);
        const providerData = getProviderById(serviceData.providerId);
        if (providerData) {
          setProvider(providerData);
        }
      }
    }
  }, [serviceId]);

  const availableTimes = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select a date and time",
        description: "Both date and time are required to book the service",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to create the booking
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment is scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}`,
    });
    navigate("/bookings");
  };

  if (!service || !provider) {
    return (
      <Layout>
        <div className="container px-4 py-12">
          <Card>
            <CardContent className="p-6">
              <p>Service not found</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">Book Service</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.durationMinutes} mins
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Provider</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-glow-100 flex items-center justify-center mr-3">
                        <span className="text-glow-600 font-medium">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {provider.location.city}, {provider.location.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border mt-2"
                      disabled={(date) => 
                        date < new Date() || 
                        date.getDay() === 0 // Sunday
                      }
                    />
                  </div>

                  <div>
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
