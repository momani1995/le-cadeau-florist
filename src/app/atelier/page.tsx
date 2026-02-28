"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AtelierPage() {
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
          className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.3fr)] lg:items-center"
        >
          <div className="space-y-6">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Behind the Ribbon
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              The Atelier
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Each bouquet at Le Cadeau begins long before the first stem is
              placed. In our Amman atelier, florists work around generous marble
              benches, studying proportion, silhouette and movement before a
              single ribbon is cut. It is a space dedicated to quiet focus,
              where every gesture is intentional and every composition is
              rehearsed.
            </p>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Hand-tied bouquets are built layer by layer, turning slowly in
              the hand until the arc of each stem feels effortless. Once the
              structure is perfected, the bouquet is wrapped in our signature
              forest green paper, then finished with molten-gold details:
              silk ribbons, wax seals and hand-embossed cards that carry your
              message in calligraphed script.
            </p>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              The same discipline guides our hat boxes and indoor plant
              compositions. Every piece leaves the atelier as a complete
              experience — flowers, packaging and presentation working together
              so that the unboxing feels as considered as the blooms
              themselves.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-[color:#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3]">
              <SafeImage
                src="/assets/atelier-process.png"
                alt="Artisans in the Le Cadeau atelier hand-tying bouquets and preparing luxury packaging."
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

