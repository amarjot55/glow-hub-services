
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== UserRole.SERVICE_PROVIDER) {
    return (
      <Layout>
        <div className="container px-4 py-12 mx-auto md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-glow-800 mb-4">Access Denied</h1>
            <p className="text-gray-500 mb-6">You need to be logged in as a service provider to access this page.</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">Provider Dashboard</h1>
          
          <div className="text-center p-8 border border-dashed rounded-lg">
            <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-gray-500">Start by setting up your services and availability</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
