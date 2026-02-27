"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { FleurDeLis } from "@/components/fleur-de-lis";
import { useCart } from "@/components/cart-context";

const navLinks = [
  { href: "/bouquets", label: "Flower Bouquets" },
  { href: "/hat-boxes", label: "Hat Boxes" },
  { href: "/candles-gifts", label: "Candles & Gifts" },
  { href: "/indoor-plants", label: "Indoor Plants" },
];

export function MainNav() {
  const { totalQuantity, toggleCart } = useCart();

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
            <FleurDeLis size={20} strokeWidth={1.6} className="text-brand-gold" />
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
          <button
            type="button"
            onClick={toggleCart}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/30 bg-[color:rgba(3,17,11,0.9)] text-brand-gold shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition hover:border-brand-gold hover:bg-[color:rgba(8,27,19,0.9)]"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-gold px-1 text-[0.6rem] font-semibold text-[color:#1b231f]">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

