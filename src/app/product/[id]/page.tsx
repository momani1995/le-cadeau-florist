"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { FleurDeLis } from "@/components/fleur-de-lis";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-context";
import { SafeImage } from "@/components/safe-image";
import { normalizeImageSrc } from "@/lib/images";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: d },
  }),
};

function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-brand-gold/30 bg-[color:rgba(7,19,14,0.7)]">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[color:#f6f1e8]/70 transition hover:text-brand-gold"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-[color:#f6f1e8]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[color:#f6f1e8]/70 transition hover:text-brand-gold"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const isFlower =
    product.category === "Bouquet" || product.category === "Hat Box";

  const related = getRelatedProducts(product.category, product.id);
  const [qty, setQty] = useState(1);
  const { addItem, openCart } = useCart();

  const imageSrc = useMemo(
    () => normalizeImageSrc(product.imageSrc),
    [product.imageSrc],
  );

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc,
        category: product.category,
      },
      qty
    );
    openCart();
  };

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,#1a3a2c,transparent_65%)] opacity-60 blur-3xl" />
        <div className="absolute right-[-8rem] top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37,transparent_65%)] opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Link
            href="/#featured"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[color:#f6f1e8]/60 transition hover:text-brand-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Collection
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="relative md:sticky md:top-24 md:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-gold/20 shadow-[0_32px_80px_rgba(0,0,0,0.75)]">
              <SafeImage
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {product.featured && (
              <span className="absolute right-4 top-4 rounded-full border border-brand-gold/40 bg-[color:rgba(2,12,8,0.88)] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-brand-gold backdrop-blur-sm">
                Featured Piece
              </span>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex flex-col justify-center space-y-6"
          >
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              {product.category}
            </p>
            <h1 className="font-heading text-3xl leading-snug tracking-[0.08em] text-[color:#f6f1e8] sm:text-4xl">
              {product.name}
            </h1>
            <p className="font-heading text-2xl tracking-[0.1em] text-[#D4AF37]">
              {product.price}
            </p>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              {product.description}
            </p>

            <div className="flex items-center gap-3 py-2">
              <span className="flex-1 border-t border-brand-gold/25" />
              <FleurDeLis size={20} strokeWidth={1.5} className="shrink-0 text-brand-gold" />
              <span className="flex-1 border-t border-brand-gold/25" />
            </div>

            <div className="space-y-3 text-xs text-[color:#f6f1e8]/70">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.28em] text-[color:#f6f1e8]/80">
                Care &amp; Delivery
              </p>
              <div className="space-y-2">
                <details className="group rounded-2xl border border-brand-gold/20 bg-[color:rgba(5,16,11,0.9)] px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-[color:#f6f1e8]/80">
                    <span className="font-semibold tracking-[0.18em] uppercase text-[0.7rem]">
                      Care Instructions
                    </span>
                    <span className="text-[0.7rem] text-brand-gold group-open:rotate-180 transition-transform">
                      ▲
                    </span>
                  </summary>
                  <div className="mt-3 space-y-1 text-[color:#f6f1e8]/70">
                    <ul className="space-y-1 pl-4">
                      <li className="list-disc">
                        Keep away from direct heat or harsh sunlight to preserve
                        color and texture.
                      </li>
                      {isFlower && (
                        <li className="list-disc">
                          Each fresh floral order includes Le Cadeau signature
                          flower food to keep your blooms vibrant for longer.
                        </li>
                      )}
                      <li className="list-disc">
                        Top up with cool, clean water and refresh the stems
                        every 2–3 days.
                      </li>
                    </ul>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-brand-gold/20 bg-[color:rgba(5,16,11,0.9)] px-4 py-3"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between text-[color:#f6f1e8]/80">
                    <span className="font-semibold tracking-[0.18em] uppercase text-[0.7rem]">
                      Delivery Info
                    </span>
                    <span className="text-[0.7rem] text-brand-gold group-open:rotate-180 transition-transform">
                      ▲
                    </span>
                  </summary>
                  <div className="mt-3 space-y-1 text-[color:#f6f1e8]/70">
                    <ul className="space-y-1 pl-4">
                      <li className="list-disc">
                        Same-day delivery is available for orders placed before
                        2 pm within our service area.
                      </li>
                      <li className="list-disc">
                        Each piece arrives in our signature forest-green Le
                        Cadeau packaging, finished with a gold wax seal and
                        handwritten card.
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <span className="flex-1 border-t border-brand-gold/25" />
              <FleurDeLis size={20} strokeWidth={1.5} className="shrink-0 text-brand-gold" />
              <span className="flex-1 border-t border-brand-gold/25" />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <QuantitySelector value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[color:#0b3b2e] px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold ring-1 ring-brand-gold/40 shadow-[0_18px_55px_rgba(0,0,0,0.6)] transition hover:bg-[color:#12512f] hover:ring-brand-gold/70"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart{qty > 1 ? ` · ${qty} × ${product.price}` : ""}
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-20"
          >
            <div className="mb-8 space-y-1">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
                You May Also Like
              </p>
              <h2 className="font-heading text-2xl tracking-[0.1em] text-[color:#f6f1e8]">
                From the Same Collection
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i * 0.07}
                >
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageSrc={item.imageSrc}
                    category={item.category}
                    isMothersDay={item.isMothersDay}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
