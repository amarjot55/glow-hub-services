
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import Layout from "@/components/layout/Layout";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export default function Register() {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: UserRole.CLIENT
  });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value as UserRole });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setFormError("All fields are required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    
    // Simple phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError("Please enter a valid phone number (10-15 digits, can start with +)");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      });
      
      // Redirect based on user role
      if (formData.role === UserRole.SERVICE_PROVIDER) {
        navigate("/provider/onboarding");
      } else {
        navigate("/");
      }
    } catch (err) {
      // Error already handled in context
    }
  };

  return (
    <Layout>
      <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-64px-230px)] px-4 md:px-6">
        <Card className="w-full max-w-md shadow-lg border-glow-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-glow-700">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your GlowHub account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Register as</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.CLIENT} id="client" />
                    <Label htmlFor="client" className="font-normal">Client</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.SERVICE_PROVIDER} id="provider" />
                    <Label htmlFor="provider" className="font-normal">Beauty Professional</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {(formError || error) && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                  {formError || error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-glow-600 hover:text-glow-800">
                Sign in
              </Link>
            </div>
            <p className="mt-4 text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-glow-600 hover:text-glow-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-glow-600 hover:text-glow-800">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
