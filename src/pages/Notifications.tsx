
import React from "react";
import Layout from "@/components/layout/Layout";
import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-8">Notifications</h1>
          
          <div className="text-center p-8 border border-dashed rounded-lg">
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
