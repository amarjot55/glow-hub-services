
import React from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function BookingHistory() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-glow-800">My Bookings</h1>
            <Button onClick={() => navigate('/services')}>Book New Service</Button>
          </div>
          
          <div className="space-y-6">
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
              <p className="text-gray-500 mb-4">You haven't made any bookings yet</p>
              <Button onClick={() => navigate('/services')}>Browse Services</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
