"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const faqs = [
  {
    id: "bespoke",
    question: "Do you offer bespoke occasions?",
    answer:
      "Yes. Beyond our curated collections, Le Cadeau designs fully bespoke floral stories for engagements, private dinners and brand launches. Our atelier team will work with your palette, venue and narrative to create cinematic installations and one-of-a-kind bouquets.",
  },
  {
    id: "finishing",
    question: "What is included in Atelier Finishing?",
    answer:
      "Atelier Finishing is our signature presentation: forest-green wrapping or hat boxes, silk ribbons cut on the bias, hand-embossed cards, and molten-gold seals. Every element is considered so that unboxing feels like opening a keepsake, not a parcel.",
  },
  {
    id: "delivery",
    question: "Where do you deliver?",
    answer:
      "We currently deliver across Amman, with same-day service for central districts such as Abdoun, Dabouq and Deir Ghbar on orders placed before 2pm. For locations beyond these areas, our concierge team will advise the best available delivery window.",
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#173529,transparent_65%)] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6 rounded-3xl border border-brand-gold/30 bg-[color:rgba(5,16,11,0.96)] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.8)]"
        >
          <div className="space-y-3">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Frequently Asked Questions
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              FAQ
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              A brief guide to the most common questions we receive about
              bespoke work, our finishing touches and delivery across Amman.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full flex-col gap-2 py-4 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-[color:#f6f1e8]">
                      {item.question}
                    </p>
                    <span className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
                      {isOpen ? "–" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                      {item.answer}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

