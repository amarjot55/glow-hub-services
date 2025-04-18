
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Award, CalendarDays } from "lucide-react";

export default function ProviderOnboarding() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/provider/profile-setup");
  };

  return (
    <Layout>
      <div className="container px-4 py-16 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-glow-800 mb-4">Join GlowHub as a Professional</h1>
            <p className="text-xl text-gray-600">Start your journey as a beauty professional and grow your business</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-glow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-6 h-6 text-glow-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Be Your Own Boss</h3>
                  <p className="text-sm text-gray-600">Set your own schedule and prices for your services</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-glow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-glow-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Grow Your Income</h3>
                  <p className="text-sm text-gray-600">Earn more by reaching new clients through our platform</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-glow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-6 h-6 text-glow-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Flexible Schedule</h3>
                  <p className="text-sm text-gray-600">Choose your working hours and availability</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Started in 3 Easy Steps</CardTitle>
              <CardDescription>Complete your profile and start accepting bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-glow-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-glow-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Complete Your Profile</h4>
                    <p className="text-sm text-gray-600">Add your professional details, experience, and certifications</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-glow-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-glow-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">List Your Services</h4>
                    <p className="text-sm text-gray-600">Add your services, prices, and availability</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-glow-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-glow-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Start Accepting Bookings</h4>
                    <p className="text-sm text-gray-600">Receive booking requests and grow your business</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" onClick={handleContinue}>Continue to Profile Setup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
