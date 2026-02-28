"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { FleurDeLis } from "@/components/fleur-de-lis";
import { useCart } from "@/components/cart-context";
import { useSeasonalTheme } from "@/components/seasonal-theme-context";

const navLinks = [
  { href: "/bouquets", label: "Flower Bouquets", key: "bouquets" },
  { href: "/hat-boxes", label: "Hat Boxes", key: "hat-boxes" },
  { href: "/candles-gifts", label: "Candles & Gifts", key: "candles-gifts" },
  { href: "/indoor-plants", label: "Indoor Plants", key: "indoor-plants" },
] as const;

const megaMenuBranches: Record<(typeof navLinks)[number]["key"], string[]> = {
  "bouquets": ["Romantic", "Sympathy", "Seasonal", "Signature"],
  "hat-boxes": ["Velvet Series", "Classic Gold", "Miniatures"],
  "candles-gifts": ["Scented Candles", "Gift Sets", "Keepsakes"],
  "indoor-plants": ["Statement Trees", "Desk-sized Greens", "Low-Light Friendly"],
};

export function MainNav() {
  const { totalQuantity, toggleCart } = useCart();
  const { isMothersDay, toggleMothersDay } = useSeasonalTheme();
  const [activeKey, setActiveKey] =
    useState<(typeof navLinks)[number]["key"] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const showMegaMenu = activeKey != null;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleMegaEnter = () => {
    if (closeTimeoutRef.current != null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMegaLeave = () => {
    if (closeTimeoutRef.current != null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveKey(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-brand-gold/15 bg-[color:rgba(3,17,11,0.9)] backdrop-blur-xl"
    >
      {isMothersDay && (
        <div className="flex items-center justify-center border-b border-[color:rgba(247,231,230,0.35)] bg-[color:rgba(247,231,230,0.12)] px-4 py-1 text-[0.7rem] font-medium tracking-[0.18em] text-[color:#f7e7e6]">
          <span className="mr-2 h-1 w-1 rounded-full bg-[color:#f7e7e6]" />
          Order by May 5th for guaranteed delivery on Mother’s Day.
        </div>
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:#1d2b23] ring-1 ring-brand-gold/45 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <FleurDeLis size={20} strokeWidth={1.6} className="text-brand-gold" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="font-heading truncate text-[0.9rem] tracking-[0.18em] text-brand-gold sm:text-[0.95rem]">
              Le Cadeau
            </p>
            <p className="hidden font-body text-xs text-[color:#f6f1e8]/70 sm:block">
              Maison de Fleurs &amp; Cadeaux
            </p>
          </div>
        </Link>

        <div
          className="relative hidden items-center gap-8 text-sm font-medium text-[color:#f6f1e8]/80 md:flex"
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        >
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                onMouseEnter={() => setActiveKey(link.key)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="group relative transition-colors hover:text-[color:#ffffff]"
                >
                  <span>{link.label}</span>
                  <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
            ))}
          </nav>

          {showMegaMenu && activeKey && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-2"
            >
              <div className="overflow-hidden rounded-2xl border border-brand-gold/25 bg-[color:rgba(7,27,18,0.98)] shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                <div className="border-b border-brand-gold/20 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  {navLinks.find((l) => l.key === activeKey)?.label}
                </div>
                <ul className="grid grid-cols-2 gap-1 px-4 py-3 text-xs text-[color:#f6f1e8]">
                  {megaMenuBranches[activeKey].map((branch) => {
                    const typeParam = encodeURIComponent(branch);
                    const href = `/${activeKey}?type=${typeParam}`;
                    return (
                      <li key={branch}>
                        <Link
                          href={href}
                          onClick={() => setActiveKey(null)}
                          className="block rounded-full px-3 py-1 text-[0.7rem] tracking-[0.12em] text-[color:#f6f1e8]/85 transition hover:bg-[color:rgba(15,55,38,0.95)] hover:text-brand-gold"
                        >
                          {branch}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/30 bg-[color:rgba(3,17,11,0.9)] text-brand-gold transition hover:border-brand-gold hover:bg-[color:rgba(8,27,19,0.9)] md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMothersDay}
            className={`hidden items-center gap-1 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] transition md:inline-flex ${
              isMothersDay
                ? "border-[color:#f7e7e6] bg-[color:rgba(247,231,230,0.18)] text-[color:#f7e7e6]"
                : "border-brand-gold/25 text-[color:#f6f1e8]/85 hover:border-brand-gold hover:bg-brand-gold/10"
            }`}
          >
            <span>{isMothersDay ? "Mother's Day On" : "Mother's Day"}</span>
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

      {/* Mobile menu overlay and panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[320px] flex-col border-l border-brand-gold/20 bg-[color:rgba(3,17,11,0.98)] shadow-2xl md:hidden"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-brand-gold/15 px-4 py-4">
                <span className="font-heading text-xs uppercase tracking-[0.22em] text-brand-gold">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[color:#f6f1e8]/80 hover:bg-white/5 hover:text-brand-gold"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-3 py-2.5 font-heading text-sm tracking-[0.12em] text-[color:#f6f1e8] transition hover:bg-[color:rgba(15,55,38,0.6)] hover:text-brand-gold"
                      >
                        {link.label}
                      </Link>
                      <ul className="ml-3 mt-1 space-y-0.5 border-l border-brand-gold/20 pl-3">
                        {megaMenuBranches[link.key].map((branch) => {
                          const typeParam = encodeURIComponent(branch);
                          const href = `/${link.key}?type=${typeParam}`;
                          return (
                            <li key={branch}>
                              <Link
                                href={href}
                                onClick={closeMobileMenu}
                                className="block rounded-lg px-2 py-1.5 text-[0.8rem] text-[color:#f6f1e8]/85 transition hover:bg-[color:rgba(15,55,38,0.5)] hover:text-brand-gold"
                              >
                                {branch}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-brand-gold/15 pt-4">
                  <Link
                    href="/bespoke"
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-3 py-2.5 text-center font-heading text-xs uppercase tracking-[0.2em] text-brand-gold transition hover:bg-[color:rgba(15,55,38,0.6)]"
                  >
                    Bespoke Occasions
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

