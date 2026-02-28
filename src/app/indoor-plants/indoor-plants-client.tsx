"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/products";
import products from "@/data/products.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function IndoorPlantsPageClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const all = (products.plants ?? []) as Product[];
  const plantProducts = type ? all.filter((p) => p.subCategory === type) : all;

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#173529,transparent_65%)] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)] lg:items-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-[color:#050b08] shadow-[0_26px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[4/3]">
              <SafeImage
                src="/assets/plants-tableau.png"
                alt="Sculptural indoor olive tree in a forest green pot with a gold watering can on a stone plinth."
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Indoor Plants
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              The Indoor Plant Atelier
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Sculptural greenery in matte ceramic vessels, styled to bring the Le Cadeau
              palette into light-flooded interiors and quiet corners.
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
            {type ? `${type} · Plant Collection` : "The Plant Collection"}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plantProducts.length === 0 ? (
              <p className="col-span-full text-center text-sm text-[color:#f6f1e8]/60">
                No plants in this sub-category yet. Browse the full collection or
                check back soon.
              </p>
            ) : (
            plantProducts.map((product) => (
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
