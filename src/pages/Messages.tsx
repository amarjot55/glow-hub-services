
import React from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">Messages</h1>
          
          <div className="text-center p-8 border border-dashed rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-4">Book a service to start chatting with providers</p>
            <Button onClick={() => navigate('/services')}>Browse Services</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
