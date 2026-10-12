import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo, DemoBooking } from "@/contexts/DemoStore";
import { formatCurrency } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { StatusBadge, Stars, RescheduleDialog, RateDialog, fmtDay } from "@/components/bookings/BookingParts";
import { UserRole } from "@/types";

type Tab = "upcoming" | "past" | "cancelled";

export default function BookingHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, setStatus, reschedule, rate } = useDemo();
  const [tab, setTab] = useState<Tab>("upcoming");
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [rateId, setRateId] = useState<string | null>(null);

  if (!user) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Log in to see your bookings</h1>
          <Button onClick={() => navigate("/login?next=/bookings")}>Log in</Button>
        </div>
      </Layout>
    );
  }

  const isProvider = user.role === UserRole.SERVICE_PROVIDER;
  const mine = bookings.filter((b) => (isProvider ? b.providerId === user.id : b.clientId === user.id));
  const groups: Record<Tab, DemoBooking[]> = {
    upcoming: mine.filter((b) => b.status === "pending" || b.status === "confirmed"),
    past: mine.filter((b) => b.status === "completed"),
    cancelled: mine.filter((b) => b.status === "cancelled"),
  };
  const list = groups[tab];

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-glow-800">{isProvider ? "Client bookings" : "My Bookings"}</h1>
            {!isProvider && <Button onClick={() => navigate("/services")}>Book New Service</Button>}
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="mb-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({groups.upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Completed ({groups.past.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({groups.cancelled.length})</TabsTrigger>
            </TabsList>
          </Tabs>

          {list.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Nothing here yet</h3>
              <p className="text-gray-500 mb-4">Bookings you make will show up here.</p>
              <Button onClick={() => navigate("/services")}>Browse Services</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((b) => (
                <Card key={b.id}>
                  <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{b.serviceName}</h3>
                        <StatusBadge status={b.status} />
                      </div>
                      <p className="text-sm text-gray-600">{isProvider ? `Client: ${b.clientName}` : `with ${b.providerName}`}</p>
                      <p className="text-sm text-gray-500 flex items-center"><Calendar className="w-4 h-4 mr-1" />{fmtDay(b.date)} at {b.time}</p>
                      <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1" />{b.address}</p>
                      <p className="text-sm font-medium">{formatCurrency(b.price + b.platformFee)}</p>
                      {b.rating && <div className="flex items-center gap-2 pt-1"><Stars value={b.rating} size="h-4 w-4" /><span className="text-sm text-gray-500">{b.review}</span></div>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/messages?provider=${b.providerId}&client=${b.clientId}`)}>
                        <MessageSquare className="w-4 h-4 mr-1" />Message
                      </Button>
                      {tab === "upcoming" && !isProvider && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => setRescheduleId(b.id)}>Reschedule</Button>
                          <Button variant="destructive" size="sm" onClick={() => { setStatus(b.id, "cancelled"); toast({ title: "Booking cancelled" }); }}>Cancel</Button>
                        </>
                      )}
                      {tab === "past" && !isProvider && !b.rating && <Button size="sm" onClick={() => setRateId(b.id)}>Rate</Button>}
                      {tab === "past" && !isProvider && <Button variant="outline" size="sm" onClick={() => navigate(`/services/${b.serviceId}`)}>Book again</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <RescheduleDialog open={!!rescheduleId} onOpenChange={(o) => !o && setRescheduleId(null)}
        onSave={(d, t) => { reschedule(rescheduleId!, d, t); toast({ title: "Reschedule requested", description: "The provider will confirm the new time." }); }} />
      <RateDialog open={!!rateId} onOpenChange={(o) => !o && setRateId(null)}
        onSave={(r, text) => { rate(rateId!, r, text); toast({ title: "Thanks for the review!" }); }} />
    </Layout>
  );
}
