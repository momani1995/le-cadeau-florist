"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { ProductCardProps } from "@/components/product-card";

const SLIDER_GOLD = "#C4A484";
const SLIDER_BG = "#05140B";

export type ProductSliderProps = {
  /** Main heading (e.g. "Signature Pieces", "Flower Bouquets") */
  sectionTitle: string;
  /** Optional small label above the title (e.g. "Bestsellers") */
  subtitle?: string;
  /** Array of product items compatible with ProductCard */
  productData: (Partial<ProductCardProps> & Pick<ProductCardProps, "name" | "price" | "imageSrc">)[];
};

export function ProductSlider({
  sectionTitle,
  subtitle,
  productData,
}: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollWidth - clientWidth <= scrollLeft + 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-product-slider-card]");
    const cardWidth = card?.getBoundingClientRect().width ?? 280;
    const gap = 20;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  if (productData.length === 0) return null;

  return (
    <section
      className="relative z-10 mx-auto max-w-6xl px-6 pb-16 lg:px-8"
      style={{ backgroundColor: SLIDER_BG }}
    >
      <div className="rounded-[20px] px-4 py-8 sm:px-6">
        <div className="mb-6">
          {subtitle && (
            <p
              className="font-heading text-xs uppercase tracking-[0.3em]"
              style={{ color: SLIDER_GOLD }}
            >
              {subtitle}
            </p>
          )}
          <h2 className="mt-2 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.65rem]">
            {sectionTitle}
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-[-50px] top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-0"
            style={{
              color: SLIDER_GOLD,
              opacity: atStart ? 0 : 1,
            }}
            aria-label="Scroll left"
            disabled={atStart}
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1.2} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-[-50px] top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-0"
            style={{
              color: SLIDER_GOLD,
              opacity: atEnd ? 0 : 1,
            }}
            aria-label="Scroll right"
            disabled={atEnd}
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1.2} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto overflow-y-hidden py-2 scroll-smooth scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {productData.map((product) => (
              <div
                key={product.id ?? product.name}
                data-product-slider-card
                className="min-w-[260px] shrink-0 sm:min-w-[280px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
