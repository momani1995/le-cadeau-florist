"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

const FORMSPREE_URL = "https://formspree.io/f/xvzbylnz";

type SubmitStatus = "idle" | "sending" | "success" | "error";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function BespokePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          eventDate: eventDate || undefined,
          venue: venue || undefined,
          message: message || undefined,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#173529,transparent_65%)] opacity-60 blur-3xl" />
        <div className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37,transparent_65%)] opacity-40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.3fr)] lg:items-start"
        >
          <div className="space-y-6">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Events & Grand Installations
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Bespoke Occasions — Events & Grand Installations
            </h1>

            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Le Cadeau designs fully bespoke floral experiences for weddings,
              corporate events and private celebrations across Amman. From
              intimate dinners to grand installations, our atelier translates
              your vision into cinematic arrangements — forest green and molten
              gold woven through every arch, table and moment.
            </p>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Whether you are planning a wedding, a brand launch or an
              at-home soirée, we work with your palette, venue and narrative to
              create one-of-a-kind floral stories. Inquire below and our team
              will respond with a tailored proposal.
            </p>

            {status === "success" ? (
              <div className="rounded-2xl border border-brand-gold/30 bg-[color:rgba(5,16,11,0.95)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
                <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold">
                  Thank You
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[color:#f6f1e8]">
                  Our Atelier will reach out to you within 24 hours to begin
                  your cinematic floral journey.
                </p>
              </div>
            ) : (
              <form
                action={FORMSPREE_URL}
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-brand-gold/30 bg-[color:rgba(5,16,11,0.95)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
              >
                <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold">
                  Inquiry
                </p>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-brand-gold/40 bg-[color:#020908] px-3 py-2.5 text-sm text-[color:#f6f1e8] placeholder:text-[color:#6b7280] focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-brand-gold/40 bg-[color:#020908] px-3 py-2.5 text-sm text-[color:#f6f1e8] placeholder:text-[color:#6b7280] focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl border border-brand-gold/40 bg-[color:#020908] px-3 py-2.5 text-sm text-[color:#f6f1e8] focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue or location"
                    className="w-full rounded-xl border border-brand-gold/40 bg-[color:#020908] px-3 py-2.5 text-sm text-[color:#f6f1e8] placeholder:text-[color:#6b7280] focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">Message</label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your occasion, style and any special requests..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-brand-gold/40 bg-[color:#020908] px-3 py-2.5 text-sm text-[color:#f6f1e8] placeholder:text-[color:#6b7280] focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs text-[color:#f97373]">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full border border-brand-gold/50 bg-[color:#0b3b2e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold transition hover:bg-[color:#14553a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-[color:#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3]">
              <SafeImage
                src="/assets/bespoke-event.png"
                alt="Le Cadeau bespoke floral installation at a luxury event in Amman."
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
