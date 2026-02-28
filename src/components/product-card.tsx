"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { SafeImage } from "@/components/safe-image";
import { normalizeImageSrc } from "@/lib/images";

export type ProductCardProps = {
  id?: string;
  name: string;
  price: string;
  imageSrc: string;
  category?: string;
  isMothersDay?: boolean;
};

export function ProductCard({
  id,
  name,
  price,
  imageSrc,
  category,
  isMothersDay,
}: ProductCardProps) {
  const { addItem } = useCart();
  const resolvedSrc = normalizeImageSrc(imageSrc);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    addItem({ id, name, price, imageSrc: resolvedSrc, category });
  };

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-[color:rgba(7,19,14,0.88)] shadow-[0_22px_55px_rgba(0,0,0,0.7)] backdrop-blur"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <SafeImage
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          priority={false}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {isMothersDay && (
          <span className="absolute left-3 top-3 rounded-full bg-[color:rgba(247,231,230,0.95)] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[color:#4b1f2a] shadow-[0_10px_25px_rgba(0,0,0,0.45)]">
            Limited Edition
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!id}
            className="group/button relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-[linear-gradient(135deg,#D4AF37,#F9E498)] bg-[length:200%_200%] px-[1px] py-[1px] text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:#fdf9ee] shadow-[0_0_24px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-[position:100%_0] active:scale-95 active:shadow-[0_0_36px_rgba(212,175,55,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:#0b3b2e] px-4 py-2">
              <ShoppingBag className="h-4 w-4 text-[color:#fdf9ee]" />
              <span>Add to Cart</span>
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-1 px-4 py-4">
        {category ? (
          <p className="font-heading text-[0.65rem] uppercase tracking-[0.32em] text-brand-gold/90">
            {category}
          </p>
        ) : null}
        <h3 className="font-heading text-sm tracking-[0.06em] text-cream">
          {name}
        </h3>
        <p className="text-xs text-cream/70">{price}</p>
      </div>
    </motion.article>
  );

  if (id) {
    return <Link href={`/product/${id}`}>{card}</Link>;
  }
  return card;
}

