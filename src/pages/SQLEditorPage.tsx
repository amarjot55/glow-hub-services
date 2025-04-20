
import Layout from "@/components/layout/Layout";
import { SQLEditor } from "@/components/SQLEditor/SQLEditor";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SQLEditorPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">SQL Editor</h1>
          <p className="mb-4">Please log in to use the SQL Editor</p>
          <Button onClick={() => navigate("/login")}>Log In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">SQL Editor</h1>
        <SQLEditor />
      </div>
    </Layout>
  );
}
