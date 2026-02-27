"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FleurDeLis } from "@/components/fleur-de-lis";

const pulse = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function SuccessPage() {
  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,#D4AF37,transparent_60%)] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={pulse}
          initial="hidden"
          animate="visible"
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-brand-gold/40 bg-[color:rgba(5,16,11,0.9)] shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
        >
          <FleurDeLis
            size={34}
            strokeWidth={1.6}
            className="text-brand-gold animate-pulse"
          />
        </motion.div>

        <p className="font-heading text-xs uppercase tracking-[0.34em] text-brand-gold">
          Order Confirmed
        </p>
        <h1 className="mt-3 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.85rem]">
          Your gift is being prepared with care.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[color:#f6f1e8]/75">
          A confirmation has been sent to your email. Our florist atelier is
          hand-selecting each stem and finishing touch before your delivery.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-brand-gold/35 px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10"
          >
            Return Home
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-full bg-[color:#0b3b2e] px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold shadow-[0_18px_55px_rgba(0,0,0,0.6)] hover:bg-[color:#14553a]"
          >
            View Order Details
          </Link>
        </div>
      </div>
    </div>
  );
}

