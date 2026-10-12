import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const COPY: Record<string, { title: string; body: string[] }> = {
  about: { title: "About GlowHub", body: [
    "GlowHub connects people with verified beauty professionals who come to their home: hair, makeup, nails, facials and massage.",
    "Clients get transparent prices and real reviews. Professionals get bookings, payments and a public profile without running a salon.",
    "This is a product prototype running on demo data.",
  ] },
  careers: { title: "Careers", body: ["We're a small team. If you love beauty, marketplaces or great product, write to us from the Contact page."] },
  blog: { title: "Blog", body: ["Coming soon: bridal prep checklists, at-home nail care and how to pick the right stylist."] },
  privacy: { title: "Privacy Policy", body: [
    "Demo mode: everything you enter stays in your browser's local storage and is never sent to a server.",
    "In production we would collect only what a booking needs (name, phone, address, time) and share the address with the assigned professional only after confirmation.",
  ] },
  terms: { title: "Terms of Service", body: [
    "Bookings are a contract between the client and the professional. GlowHub charges a 20% platform fee shown before you confirm.",
    "Free cancellation up to 24 hours before the appointment.",
  ] },
};

const FAQ = [
  ["How do I book?", "Open Services, pick a service, choose a date, time and address, then request the booking. The professional confirms it."],
  ["Can I reschedule?", "Yes. In My Bookings, choose Reschedule on any upcoming booking. The professional confirms the new time."],
  ["How are professionals verified?", "ID and portfolio checks during onboarding, plus ratings from completed bookings."],
  ["What does the platform fee cover?", "Payments, support and insurance for at-home services. It's 20% of the service price, shown up front."],
];

export default function InfoPage({ page }: { page: string }) {
  const [sent, setSent] = useState(false);
  const c = COPY[page];

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {page === "faq" && (
            <>
              <h1 className="text-3xl font-bold text-glow-800 mb-4">Frequently asked questions</h1>
              <Accordion type="single" collapsible>
                {FAQ.map(([q, a]) => (
                  <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
                ))}
              </Accordion>
            </>
          )}
          {page === "contact" && (
            <>
              <h1 className="text-3xl font-bold text-glow-800 mb-4">Contact us</h1>
              {sent ? <p className="text-gray-600">Thanks! We'll reply within a day.</p> : (
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); toast({ title: "Message sent" }); }}>
                  <Input required placeholder="Your name" />
                  <Input required type="email" placeholder="Email" />
                  <Textarea required placeholder="How can we help?" />
                  <Button type="submit">Send</Button>
                </form>
              )}
            </>
          )}
          {c && (
            <>
              <h1 className="text-3xl font-bold text-glow-800 mb-4">{c.title}</h1>
              {c.body.map((p) => <p key={p} className="text-gray-600">{p}</p>)}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
