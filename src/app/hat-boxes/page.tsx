"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";
import { FOREST_GREEN_BLUR } from "@/lib/images";
import { ProductCard } from "@/components/product-card";
import products from "@/data/products.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type HatBoxProduct = (typeof products.hatBoxes)[number];

export default function HatBoxesPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const all = (products.hatBoxes ?? []) as HatBoxProduct[];
  const hatBoxProducts = type ? all.filter((p) => p.subCategory === type) : all;

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37,transparent_65%)] opacity-50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.35fr)] lg:items-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-[#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3] bg-[#050b08]">
              <SafeImage
                src="/assets/hatboxes-tableau.png"
                alt="Le Cadeau signature forest green hat box filled with white roses on a cream backdrop."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL={FOREST_GREEN_BLUR}
                quality={90}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Hat Boxes
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Parisian Hat Boxes
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Velvet and suede boxes overflowing with curated blooms, designed for
              anniversaries, grand gestures and centerpieces that feel like a film still.
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-4"
        >
          <h2 className="font-heading text-xl tracking-[0.12em] text-[color:#f6f1e8]">
            {type ? `${type} · Hat Box Collection` : "The Hat Box Collection"}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hatBoxProducts.length === 0 ? (
              <p className="col-span-full text-center text-sm text-[color:#f6f1e8]/60">
                No hat boxes in this sub-category yet. Browse the full collection
                or check back soon.
              </p>
            ) : (
            hatBoxProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageSrc={product.imageSrc}
                category={product.category}
                isMothersDay={product.isMothersDay}
              />
            ))
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

