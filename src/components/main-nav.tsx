"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flower } from "lucide-react"; // Replace FleurDeLis with Flower

const navLinks = [
  { href: "/bouquets", label: "Flower Bouquets" },
  { href: "/hat-boxes", label: "Hat Boxes" },
  { href: "/candles-gifts", label: "Candles & Gifts" },
  { href: "/indoor-plants", label: "Indoor Plants" },
];

export function MainNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-brand-gold/15 bg-[color:rgba(3,17,11,0.9)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:#1d2b23] ring-1 ring-brand-gold/45 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <Flower className="h-5 w-5 text-brand-gold" strokeWidth={1.6} />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-[0.95rem] tracking-[0.18em] text-brand-gold">
              Le Cadeau
            </p>
            <p className="font-body text-xs text-[color:#f6f1e8]/70">
              Maison de Fleurs &amp; Cadeaux
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:#f6f1e8]/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative transition-colors hover:text-[color:#ffffff]"
            >
              <span>{link.label}</span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-brand-gold/25 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[color:#f6f1e8]/85 transition hover:border-brand-gold hover:bg-brand-gold/10 md:inline-flex">
            Visit Boutique
          </button>
          <Link
            href="#featured"
            className="inline-flex items-center justify-center rounded-full bg-brand-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:#1b231f] shadow-[0_14px_45px_rgba(0,0,0,0.45)] transition hover:bg-brand-gold/90"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

