import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoStore";
import { fmtAgo } from "@/components/bookings/BookingParts";

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, markAllRead, markRead } = useDemo();
  const mine = user ? notifications.filter((n) => n.userId === user.id) : [];
  const unread = mine.filter((n) => !n.read).length;

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-glow-800">Notifications</h1>
            {unread > 0 && <Button variant="outline" onClick={() => markAllRead(user!.id)}>Mark all as read</Button>}
          </div>
          {!user ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-gray-500 mb-4">Log in to see your notifications.</p>
              <Button onClick={() => navigate("/login?next=/notifications")}>Log in</Button>
            </div>
          ) : mine.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {mine.map((n) => (
                <button key={n.id} type="button"
                  onClick={() => { markRead(n.id); if (n.link) navigate(n.link); }}
                  className={`w-full text-left p-4 rounded-lg border flex gap-3 items-start hover:bg-glow-50 ${n.read ? "bg-white" : "bg-glow-50 border-glow-200"}`}>
                  <span className={`mt-1.5 h-2 w-2 rounded-full ${n.read ? "bg-transparent" : "bg-glow-600"}`} />
                  <div className="flex-1">
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-600">{n.body}</p>
                  </div>
                  <span className="text-xs text-gray-400">{fmtAgo(n.at)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
