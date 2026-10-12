import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getServiceById, getProviderById, formatCurrency } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Clock, MapPin, CalendarDays, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoStore";
import { DateTimePicker } from "@/components/bookings/BookingParts";
import { getBrowserLocation, reverseGeocode } from "@/api/glowhub";
import { LocateFixed } from "lucide-react";
import { UserRole } from "@/types";

export default function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBooking } = useDemo();
  const service = serviceId ? getServiceById(serviceId) : undefined;
  const provider = service ? getProviderById(service.providerId) : undefined;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [locating, setLocating] = useState(false);

  const fillAddress = async () => {
    setLocating(true);
    try {
      const { lat, lng } = await getBrowserLocation();
      setAddress(await reverseGeocode(lat, lng));
    } catch (e) {
      toast({ title: "Couldn't detect your address", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLocating(false);
    }
  };

  if (!service || !provider) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Service not found</h1>
          <p className="text-gray-500 mb-6">It may have been removed by the provider.</p>
          <Button onClick={() => navigate("/services")}>Browse services</Button>
        </div>
      </Layout>
    );
  }

  const fee = Math.round(service.price * 0.2);

  const handleBooking = () => {
    if (!user) {
      toast({ title: "Please log in to book", description: "Use the Client Demo button for a one-click login." });
      navigate(`/login?next=/services/${service.id}`);
      return;
    }
    if (user.role === UserRole.SERVICE_PROVIDER) {
      toast({ title: "Switch to a client account", description: "Providers can't book services. Log in with the Client Demo.", variant: "destructive" });
      return;
    }
    if (!selectedDate || !selectedTime || address.trim().length < 5) {
      toast({ title: "A few details are missing", description: "Pick a date, a time and enter the address for the visit.", variant: "destructive" });
      return;
    }
    createBooking({ serviceId: service.id, clientId: user.id, clientName: user.name, date: selectedDate, time: selectedTime, address: address.trim(), notes: notes.trim() || undefined });
    toast({ title: "Booking requested!", description: `${provider.name} will confirm ${format(selectedDate, "PPP")} at ${selectedTime}.` });
    navigate("/bookings");
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">Book Service</h1>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              {service.images?.[0] && <img src={service.images[0]} alt={service.name} className="h-48 w-full object-cover rounded-t-lg" />}
              <CardHeader><CardTitle>{service.name}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{formatCurrency(service.price)}</span>
                  <span className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1" />{service.durationMinutes} mins</span>
                </div>
                {service.inHomeService && <p className="text-sm text-glow-700 flex items-center"><Home className="w-4 h-4 mr-1" />At-home service</p>}
                <div className="pt-4 border-t">
                  <p className="font-medium mb-2">Provider</p>
                  <Link to={`/providers/${provider.id}`} className="flex items-center hover:opacity-80">
                    {provider.avatar ? <img src={provider.avatar} alt="" className="h-10 w-10 rounded-full mr-3 bg-glow-100" /> : (
                      <div className="h-10 w-10 rounded-full bg-glow-100 flex items-center justify-center mr-3">
                        <span className="text-glow-600 font-medium">{provider.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{provider.name} · ⭐ {provider.rating}</p>
                      <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1" />{provider.location.city}, {provider.location.state}</p>
                    </div>
                  </Link>
                </div>
                <div className="pt-4 border-t text-sm space-y-1">
                  <div className="flex justify-between"><span>Service</span><span>{formatCurrency(service.price)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Platform fee (20%)</span><span>{formatCurrency(fee)}</span></div>
                  <div className="flex justify-between font-semibold pt-1"><span>Total</span><span>{formatCurrency(service.price + fee)}</span></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Date, time & address</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <DateTimePicker date={selectedDate} time={selectedTime} onDate={setSelectedDate} onTime={setSelectedTime} />
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="address">Address for the visit</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={fillAddress} disabled={locating}>
                      <LocateFixed className="w-4 h-4 mr-1" />{locating ? "Detecting…" : "Use my location"}
                    </Button>
                  </div>
                  <Input id="address" className="mt-2" placeholder="Flat, street, city" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="notes">Notes for the provider (optional)</Label>
                  <Textarea id="notes" className="mt-2" placeholder="Occasion, allergies, preferences" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <Button className="w-full" size="lg" onClick={handleBooking}>
                  <CalendarDays className="mr-2 h-5 w-5" />
                  {user ? "Request booking" : "Log in to book"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
