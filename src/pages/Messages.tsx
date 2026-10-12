import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoStore";
import { getProviderById, clients } from "@/data/mockData";
import { fmtAgo } from "@/components/bookings/BookingParts";
import { UserRole } from "@/types";

export default function Messages() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const { messages, bookings, sendMessage } = useDemo();
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isProvider = user?.role === UserRole.SERVICE_PROVIDER;

  // A thread is one provider-client pair. Threads come from messages and bookings.
  const threads = useMemo(() => {
    if (!user) return [] as { providerId: string; clientId: string; name: string }[];
    const keys = new Map<string, { providerId: string; clientId: string; name: string }>();
    const add = (providerId: string, clientId: string) => {
      const mineSide = isProvider ? providerId === user.id : clientId === user.id;
      if (!mineSide) return;
      const name = isProvider
        ? bookings.find((b) => b.clientId === clientId)?.clientName ?? clients.find((c) => c.id === clientId)?.name ?? "Client"
        : getProviderById(providerId)?.name ?? "Provider";
      keys.set(`${providerId}|${clientId}`, { providerId, clientId, name });
    };
    messages.forEach((m) => add(m.providerId, m.clientId));
    bookings.forEach((b) => add(b.providerId, b.clientId));
    const qp = params.get("provider");
    if (qp && !isProvider) add(qp, user.id);
    return [...keys.values()];
  }, [messages, bookings, user, isProvider, params]);

  const initial = (() => {
    const p = params.get("provider");
    const c = params.get("client");
    const hit = threads.find((t) => (!p || t.providerId === p) && (!c || t.clientId === c));
    return hit ?? threads[0];
  })();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = threads.find((t) => `${t.providerId}|${t.clientId}` === activeKey) ?? initial;
  const convo = active ? messages.filter((m) => m.providerId === active.providerId && m.clientId === active.clientId) : [];

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [convo.length]);

  if (!user) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Log in to see your messages</h1>
          <Button onClick={() => navigate("/login?next=/messages")}>Log in</Button>
        </div>
      </Layout>
    );
  }

  const send = () => {
    if (!active || !text.trim()) return;
    sendMessage(active.providerId, active.clientId, isProvider ? "provider" : "client", text.trim());
    setText("");
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-glow-800 mb-6">Messages</h1>
          {threads.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-gray-500 mb-4">Book a service to start chatting with providers</p>
              <Button onClick={() => navigate("/services")}>Browse Services</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-[260px_1fr] border rounded-lg overflow-hidden bg-white h-[560px]">
              <div className="border-r overflow-y-auto">
                {threads.map((t) => {
                  const key = `${t.providerId}|${t.clientId}`;
                  const last = messages.filter((m) => m.providerId === t.providerId && m.clientId === t.clientId).slice(-1)[0];
                  const isActive = active && key === `${active.providerId}|${active.clientId}`;
                  return (
                    <button key={key} type="button" onClick={() => setActiveKey(key)}
                      className={`w-full text-left p-4 border-b hover:bg-glow-50 ${isActive ? "bg-glow-100" : ""}`}>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-gray-500 truncate">{last ? last.text : "Start the conversation"}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col min-h-0">
                <div className="p-4 border-b font-semibold">{active?.name}</div>
                <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {convo.length === 0 && <p className="text-sm text-gray-500 text-center">Say hello 👋</p>}
                  {convo.map((m) => {
                    const mine = (m.from === "provider") === isProvider;
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-glow-600 text-white" : "bg-white border"}`}>
                          <p>{m.text}</p>
                          <p className={`text-[10px] mt-1 ${mine ? "text-white/70" : "text-gray-400"}`}>{fmtAgo(m.at)}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={endRef} />
                </div>
                <form className="p-3 border-t flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
                  <Input placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} />
                  <Button type="submit" aria-label="Send" disabled={!text.trim()}><Send className="w-4 h-4" /></Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
