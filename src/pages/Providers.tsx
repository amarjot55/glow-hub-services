import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { serviceProviders, formatCurrency } from "@/data/mockData";
import { useDemo } from "@/contexts/DemoStore";
import { Heart, MapPin, Search, Star } from "lucide-react";

export default function Providers() {
  const [q, setQ] = useState("");
  const [onlyFav, setOnlyFav] = useState(false);
  const { favourites, toggleFavourite } = useDemo();
  const list = serviceProviders.filter((p) => {
    const hay = `${p.name} ${p.location.city} ${p.services.map((s) => s.name + " " + s.category).join(" ")}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (!onlyFav || favourites.includes(p.id));
  });

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-2">Beauty professionals</h1>
          <p className="text-gray-500 mb-6">Verified stylists who come to you.</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-9" placeholder="Search by name, city or service" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Button variant={onlyFav ? "default" : "outline"} onClick={() => setOnlyFav((v) => !v)}>
              <Heart className="w-4 h-4 mr-1" />Saved ({favourites.length})
            </Button>
          </div>
          {list.length === 0 && <p className="text-gray-500">No professionals match. Try another search.</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => {
              const from = Math.min(...p.services.map((s) => s.price));
              const fav = favourites.includes(p.id);
              return (
                <Card key={p.id} className="overflow-hidden">
                  <div className="h-28 bg-gradient-to-br from-glow-200 to-glow-500 relative">
                    <button type="button" aria-label={fav ? "Remove from saved" : "Save"} onClick={() => toggleFavourite(p.id)}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                      <Heart className={`w-4 h-4 ${fav ? "fill-rose-500 text-rose-500" : "text-gray-600"}`} />
                    </button>
                  </div>
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{p.name}</h3>
                      {p.verified && <Badge variant="secondary">Verified</Badge>}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1" />{p.location.city}, {p.location.state}</p>
                    <p className="text-sm flex items-center"><Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />{p.rating} ({p.reviewCount} reviews) · {p.experience} yrs</p>
                    <p className="text-sm text-gray-600">From {formatCurrency(from)}</p>
                    <Link to={`/providers/${p.id}`}><Button className="w-full mt-2">View profile</Button></Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
