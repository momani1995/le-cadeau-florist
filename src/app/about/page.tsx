"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
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
          className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] lg:items-center"
        >
          <div className="space-y-6">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Our Story
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Our Story - Established with Grace
            </h1>

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                Le Cadeau began as a boutique floral house in the heart of
                Amman, created for those who believe that certain moments
                deserve more than the ordinary. From the very first bouquet,
                our ambition was cinematic: to choreograph light, shadow and
                movement so that each arrangement feels like a still from a
                film rather than a simple composition of stems.
              </p>
              <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                We call our approach Couture Precision. Every stem is measured,
                every angle rehearsed, and every ribbon aligned to the millimetre.
                Our ateliers work against a backdrop of deep forest green, with
                details brushed in molten gold — a visual language that threads
                through our hat boxes, cards and hand-embossed seals. The result
                is a house signature that feels quietly opulent, never loud.
              </p>
              <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                Over the years, Le Cadeau has evolved from a neighbourhood
                florist into a destination for high-fashion floral design.
                Classic bouquets gave way to sculptural silhouettes, palettes
                lifted from couture runways and presentations that echo gallery
                openings. Yet our purpose remains the same: to honour life&apos;s
                occasions with flowers that feel composed, considered and
                deeply personal.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-[color:#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3]">
              <SafeImage
                src="/assets/Our_Story.png"
                alt="Inside the Le Cadeau atelier: florists composing bouquets on a marble table under soft studio light."
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

