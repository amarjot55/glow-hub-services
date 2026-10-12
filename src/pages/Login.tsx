
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";

export default function Login() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const afterLogin = (asProvider: boolean) => navigate(params.get("next") || (asProvider ? "/provider/dashboard" : "/services"));

  const demoLogin = async (asProvider: boolean) => {
    const demoEmail = asProvider ? "provider@example.com" : "client@example.com";
    setEmail(demoEmail);
    setPassword("password");
    try {
      await login({ email: demoEmail, password: "password" });
      afterLogin(asProvider);
    } catch { /* shown by context */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    try {
      await login({ email, password });
      afterLogin(email === "provider@example.com");
    } catch (err) {
      // Error already handled in context
    }
  };

  return (
    <Layout>
      <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-64px-230px)] px-4 md:px-6">
        <Card className="w-full max-w-md shadow-lg border-glow-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-glow-700">Sign in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-glow-600 hover:text-glow-800">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {(formError || error) && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                  {formError || error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <div className="px-3 text-xs text-gray-500 bg-white">OR</div>
              <div className="border-t border-gray-200 w-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-sm">One-click demo:</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => demoLogin(true)}
              >
                Provider Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => demoLogin(false)}
              >
                Client Demo
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-glow-600 hover:text-glow-800">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
