
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoStore";
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const { bookings, favourites, resetDemo } = useDemo();
  const mine = user ? bookings.filter((b) => b.clientId === user.id || b.providerId === user.id) : [];
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">My Profile</h1>
          
          {user ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-glow-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-glow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4"><p className="text-sm text-gray-500">Role</p><p className="font-semibold">{user.role === UserRole.SERVICE_PROVIDER ? "Professional" : "Client"}</p></div>
                <div className="border rounded-lg p-4"><p className="text-sm text-gray-500">Bookings</p><p className="font-semibold">{mine.length}</p></div>
                <div className="border rounded-lg p-4"><p className="text-sm text-gray-500">Saved pros</p><p className="font-semibold">{favourites.length}</p></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => navigate(user.role === UserRole.SERVICE_PROVIDER ? "/provider/dashboard" : "/bookings")}>
                  {user.role === UserRole.SERVICE_PROVIDER ? "Open dashboard" : "My bookings"}
                </Button>
                <Button variant="outline" onClick={() => navigate("/notifications")}>Notifications</Button>
                <Button variant="outline" onClick={() => { resetDemo(); toast({ title: "Demo data reset" }); }}>Reset demo data</Button>
              </div>
              <div className="pt-6 border-t">
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Not logged in</h3>
              <p className="text-gray-500 mb-4">Please login to view your profile</p>
              <div className="space-x-4">
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button variant="outline" onClick={() => navigate('/register')}>Register</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
