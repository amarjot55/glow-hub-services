import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <div className="container flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>We'll email you a reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <p className="text-sm text-gray-600">If that email has an account, a reset link is on its way. (Demo mode: no email is actually sent.) <Link to="/login" className="text-glow-600">Back to login</Link></p>
            ) : (
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <Input type="email" required placeholder="you@example.com" />
                <Button type="submit" className="w-full">Send reset link</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
