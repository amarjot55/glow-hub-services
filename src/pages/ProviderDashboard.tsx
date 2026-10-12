import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import { getProviderById, formatCurrency } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { StatusBadge, Stars, fmtDay } from "@/components/bookings/BookingParts";
import { Calendar, MessageSquare, Wallet, Star, Clock } from "lucide-react";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { bookings, setStatus } = useDemo();
  const navigate = useNavigate();

  if (!user || user.role !== UserRole.SERVICE_PROVIDER) {
    return (
      <Layout>
        <div className="container px-4 py-12 mx-auto md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-glow-800 mb-4">Access Denied</h1>
            <p className="text-gray-500 mb-6">You need to be logged in as a service provider to access this page.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/login?next=/provider/dashboard")}>Log in as provider</Button>
              <Button variant="outline" onClick={() => navigate("/")}>Return Home</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const profile = getProviderById(user.id);
  const mine = bookings.filter((b) => b.providerId === user.id);
  const pending = mine.filter((b) => b.status === "pending");
  const upcoming = mine.filter((b) => b.status === "confirmed");
  const completed = mine.filter((b) => b.status === "completed");
  const earnings = completed.reduce((s, b) => s + b.price, 0);
  const rated = mine.filter((b) => b.rating);
  const avgRating = rated.length ? (rated.reduce((s, b) => s + (b.rating ?? 0), 0) / rated.length).toFixed(1) : profile?.rating.toFixed(1) ?? "–";

  const act = (id: string, status: "confirmed" | "cancelled" | "completed", msg: string) => {
    setStatus(id, status);
    toast({ title: msg });
  };

  const stats = [
    { label: "Requests", value: pending.length, icon: Clock },
    { label: "Upcoming", value: upcoming.length, icon: Calendar },
    { label: "Earnings (paid out)", value: formatCurrency(earnings), icon: Wallet },
    { label: "Avg rating", value: avgRating, icon: Star },
  ];

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-glow-800">Hi {user.name.split(" ")[0]} 👋</h1>
              <p className="text-gray-500">Here's your business today.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/provider/services-setup")}>Manage services</Button>
              <Button onClick={() => navigate(`/providers/${user.id}`)}>View public profile</Button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="p-5 flex items-center justify-between">
                  <div><p className="text-sm text-gray-500">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
                  <s.icon className="w-8 h-8 text-glow-500" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>Booking requests</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {pending.length === 0 && <p className="text-gray-500 text-sm">No pending requests. New requests appear here.</p>}
              {pending.map((b) => (
                <div key={b.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-lg p-4">
                  <div>
                    <p className="font-medium">{b.serviceName} · {b.clientName}</p>
                    <p className="text-sm text-gray-500">{fmtDay(b.date)} at {b.time} · {b.address}</p>
                    {b.notes && <p className="text-sm text-gray-600 italic">“{b.notes}”</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => act(b.id, "confirmed", "Booking accepted")}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => act(b.id, "cancelled", "Booking declined")}>Decline</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Upcoming appointments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {upcoming.length === 0 && <p className="text-gray-500 text-sm">Nothing scheduled yet.</p>}
              {upcoming.map((b) => (
                <div key={b.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-lg p-4">
                  <div>
                    <div className="flex items-center gap-2"><p className="font-medium">{b.serviceName} · {b.clientName}</p><StatusBadge status={b.status} /></div>
                    <p className="text-sm text-gray-500">{fmtDay(b.date)} at {b.time} · {formatCurrency(b.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/messages?provider=${b.providerId}&client=${b.clientId}`)}><MessageSquare className="w-4 h-4 mr-1" />Message</Button>
                    <Button size="sm" onClick={() => act(b.id, "completed", "Marked as completed")}>Mark completed</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent reviews</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {rated.length === 0 && <p className="text-gray-500 text-sm">Reviews from completed bookings show here.</p>}
              {rated.map((b) => (
                <div key={b.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2"><Stars value={b.rating!} size="h-4 w-4" /><span className="text-sm text-gray-500">{b.clientName} · {b.serviceName}</span></div>
                  {b.review && <p className="text-sm mt-1">{b.review}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
