"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import { ProductCard } from "@/components/product-card";
import products from "@/data/products.json";
import { useSeasonalTheme } from "@/components/seasonal-theme-context";

const featuredCollections = [
  {
    id: "bouquets",
    name: "Haute Couture Bouquets",
    description: "Hand-tied arrangements with seasonal, hand-selected stems.",
    accent: "Signature wrapping & golden detailing.",
  },
  {
    id: "hat-boxes",
    name: "Parisian Hat Boxes",
    description: "Velvet and suede boxes overflowing with curated blooms.",
    accent: "Perfect for anniversaries & grand gestures.",
  },
  {
    id: "candles-gifts",
    name: "Candles & Artful Gifts",
    description: "Scented candles, curated objects and delicate keepsakes.",
    accent: "Thoughtfully paired with floral stories.",
  },
  {
    id: "indoor-plants",
    name: "Indoor Plant Atelier",
    description: "Lush greenery styled for contemporary interiors.",
    accent: "Ceramic vessels & sculptural silhouettes.",
  },
];

const bestsellers = [
  ...products.bouquets.filter((item) => item.featured),
  ...products.hatBoxes.filter((item) => item.featured),
  ...products.candles.filter((item) => item.featured),
  ...products.plants.filter((item) => item.featured),
];

const mothersDayFavorites = [
  ...products.bouquets.filter((item) => item.featured),
  ...products.hatBoxes.filter((item) => item.featured),
];

export default function Home() {
  const { isMothersDay } = useSeasonalTheme();

  return (
    <div className="relative isolate overflow-hidden">
      {/* Cinematic background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-6rem] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#365a47,transparent_65%)] opacity-70 blur-3xl" />
        <div className="absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37,transparent_65%)] opacity-60 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-10rem] h-80 bg-[radial-gradient(circle_at_center,#050b08,transparent_70%)] opacity-80" />
      </div>

      <section className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center gap-16 px-6 py-14 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        {/* Left: Cinematic hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-[color:rgba(3,17,11,0.9)] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[color:#f6f1e8]/80">
            <Sparkles className="h-3 w-3 text-brand-gold" />
            {isMothersDay
              ? "The Mother’s Day Collection"
              : "Luxury Florist · Established with Grace"}
          </div>

          <div className="space-y-4">
            {isMothersDay ? (
              <h1 className="font-heading text-3xl leading-tight tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2.1rem]">
                The Mother’s Day Collection:
                <span className="block text-[1.6rem] font-normal tracking-[0.16em] text-[color:#f7e7e6]">
                  Honor Her Grace
                </span>
              </h1>
            ) : (
              <h1 className="font-heading text-4xl leading-tight tracking-[0.18em] text-[color:#f6f1e8] sm:text-5xl lg:text-[3.1rem]">
                LE CADEAU
                <span className="block text-base font-normal tracking-[0.38em] text-brand-gold">
                  FLEURISTE DE LUXE
                </span>
              </h1>
            )}
            <p className="font-body text-sm leading-relaxed text-[color:#f6f1e8]/75 sm:text-base">
              A cinematic floral house crafting bouquets, hat boxes and curated gifts for
              moments that deserve more than ordinary. Each creation is styled with couture
              precision, wrapped in forest green and brushed with molten gold.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#featured"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[linear-gradient(135deg,#D4AF37,#F9E498)] bg-[length:200%_200%] px-[1px] py-[1px] text-xs font-semibold uppercase tracking-[0.26em] text-[color:#f6f1e8] shadow-[0_0_26px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-[position:100%_0] active:scale-95 active:shadow-[0_0_40px_rgba(212,175,55,0.8)]"
            >
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:#0b3b2e] px-7 py-3 text-[0.7rem]">
                <span className="tracking-[0.26em] text-[color:#fdf9ee]">
                  Shop Collections
                </span>
                <ArrowRight className="h-4 w-4 text-[color:#fdf9ee]" />
              </span>
            </Link>
            <Link
              href="/bespoke"
              className="inline-flex items-center justify-center rounded-full border border-[color:rgba(246,241,232,0.28)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[color:#f6f1e8]/80 transition hover:border-brand-gold hover:bg-[color:rgba(10,24,18,0.9)]"
            >
              Bespoke Occasions
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-[color:#f6f1e8]/60">
            <div>
              <p className="font-heading text-[0.75rem] uppercase tracking-[0.28em] text-brand-gold">
                Same-Day Delivery
              </p>
              <p className="mt-1">Across central city districts for orders before 2pm.</p>
            </div>
            <div>
              <p className="font-heading text-[0.75rem] uppercase tracking-[0.28em] text-brand-gold">
                Atelier Finishing
              </p>
              <p className="mt-1">Silk ribbons, hand-embossed cards, and signature fragrance.</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Cinematic vignette & featured preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/45 bg-[color:#050b08] shadow-[0_32px_80px_rgba(0,0,0,0.75)]">
            <div className="relative aspect-[4/3]">
              <SafeImage
                src={
                  isMothersDay
                    ? "/hero-mothers-day.png"
                    : "/assets/hero-tableau.png"
                }
                alt={
                  isMothersDay
                    ? "Soft pink peonies with brushed gold accents styled for the Le Cadeau Mother’s Day collection."
                    : "Le Cadeau tableau featuring hat boxes, bouquets, candles and indoor plants styled on a cream backdrop."
                }
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <div className="relative space-y-3 px-5 pb-5 pt-4">
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-[color:#f6f1e8]/70">
                {isMothersDay
                  ? "The Mother’s Day Vignette"
                  : "The Le Cadeau Tableau"}
              </p>
              <p className="max-w-xs text-sm text-[color:#f6f1e8]/75">
                {isMothersDay
                  ? "Pink peonies, soft cream textiles and brushed gold details styled as an ode to the mothers we honor."
                  : "Our signature forest-green hat boxes, hand-tied bouquets, candles and indoor plants styled together as a cinematic still life."}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {isMothersDay && (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-[color:#f7e7e6]">
                Mother’s Day Favorites
              </p>
              <h2 className="mt-2 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.65rem]">
                Hat Boxes &amp; Bouquets She’ll Remember
              </h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {mothersDayFavorites.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </section>
      )}

      {/* Bestsellers */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-brand-gold">
              Bestsellers
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.65rem]">
              Signature Pieces
            </h2>
          </div>
          <p className="hidden max-w-xs text-xs text-[color:#f6f1e8]/65 sm:block">
            Hover a piece to reveal the atelier-style add-to-cart moment.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      {/* Featured collections grid */}
      <section
        id="featured"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-brand-gold">
              Featured Collections
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.65rem]">
              Curated for Grand Gestures
            </h2>
          </div>
          <p className="hidden max-w-xs text-xs text-[color:#f6f1e8]/65 sm:block">
            Each collection is designed to move seamlessly from online gallery
            to doorstep, arriving with museum-worthy presentation.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-3xl border border-brand-gold/30 bg-[color:#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[4/2]">
            <SafeImage
              src="/assets/le-cadeau-four-grid.png"
              alt="Four Le Cadeau product vignettes: Parisian Hat Boxes, Candlelit Finishing Touches, Haute Couture Bouquets, and The Indoor Plant Atelier."
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredCollections.map((collection, index) => (
            <motion.article
              key={collection.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-brand-gold/22 bg-[color:rgba(7,19,14,0.9)]/90 p-4 shadow-[0_22px_55px_rgba(0,0,0,0.7)] backdrop-blur-lg"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff12,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative space-y-3">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.32em] text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-sm leading-snug text-[color:#f6f1e8]">
                  {collection.name}
                </h3>
                <p className="text-xs text-[color:#f6f1e8]/70">
                  {collection.description}
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[color:#f6f1e8]/55">
                  {collection.accent}
                </p>
                <Link
                  href={`/${collection.id}`}
                  className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-gold transition group-hover:gap-2"
                >
                  Explore
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
