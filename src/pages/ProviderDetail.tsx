import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProviderById, getReviewsByProviderId, formatCurrency } from "@/data/mockData";
import { useDemo } from "@/contexts/DemoStore";
import { useAuth } from "@/contexts/AuthContext";
import { Stars } from "@/components/bookings/BookingParts";
import { Clock, Heart, MapPin, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ProviderDetail() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favourites, toggleFavourite, bookings } = useDemo();
  const p = providerId ? getProviderById(providerId) : undefined;

  if (!p) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Professional not found</h1>
          <Button onClick={() => navigate("/providers")}>See all professionals</Button>
        </div>
      </Layout>
    );
  }

  const fav = favourites.includes(p.id);
  const reviews = [
    ...bookings.filter((b) => b.providerId === p.id && b.rating).map((b) => ({ id: b.id, rating: b.rating!, comment: b.review ?? "", by: b.clientName })),
    ...getReviewsByProviderId(p.id).filter((r) => r.id !== "r1").map((r) => ({ id: r.id, rating: r.rating, comment: r.comment ?? "", by: "Verified client" })),
  ];

  const message = () => {
    if (!user) { toast({ title: "Log in to message", description: "Use the Client Demo button for a one-click login." }); navigate("/login"); return; }
    navigate(`/messages?provider=${p.id}`);
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-glow-300 to-glow-600" />
            <CardContent className="p-6 -mt-12">
              <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
                <div className="flex items-end gap-4">
                  <div className="h-24 w-24 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-3xl font-bold text-glow-600">{p.name.charAt(0)}</div>
                  <div>
                    <div className="flex items-center gap-2"><h1 className="text-2xl font-bold">{p.name}</h1>{p.verified && <Badge variant="secondary">Verified</Badge>}</div>
                    <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1" />{p.location.city}, {p.location.state} · {p.experience} yrs experience</p>
                    <div className="flex items-center gap-2 text-sm"><Stars value={Math.round(p.rating)} size="h-4 w-4" />{p.rating} ({p.reviewCount})</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { toggleFavourite(p.id); toast({ title: fav ? "Removed from saved" : "Saved to favourites" }); }}>
                    <Heart className={`w-4 h-4 mr-1 ${fav ? "fill-rose-500 text-rose-500" : ""}`} />{fav ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" onClick={message}><MessageSquare className="w-4 h-4 mr-1" />Message</Button>
                </div>
              </div>
              <p className="text-gray-600 mt-4">{p.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Services</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {p.services.map((s) => (
                <div key={s.id} className="border rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between"><h3 className="font-medium">{s.name}</h3><span className="font-semibold">{formatCurrency(s.price)}</span></div>
                  <p className="text-sm text-gray-500">{s.description}</p>
                  <p className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{s.durationMinutes} mins</p>
                  <Link to={`/services/${s.id}`}><Button size="sm" className="w-full">Book</Button></Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
            <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {p.portfolio.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden border">
                  <div className="h-28 bg-gradient-to-br from-glow-100 to-glow-300 flex items-center justify-center text-glow-700 text-sm font-medium px-2 text-center">{item.title}</div>
                  {item.description && <p className="text-xs text-gray-500 p-2">{item.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {reviews.length === 0 && <p className="text-sm text-gray-500">No written reviews yet.</p>}
              {reviews.map((r) => (
                <div key={r.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2"><Stars value={r.rating} size="h-4 w-4" /><span className="text-sm text-gray-500">{r.by}</span></div>
                  {r.comment && <p className="text-sm mt-1">{r.comment}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
