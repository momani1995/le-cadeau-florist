"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { SafeImage } from "@/components/safe-image";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalPrice,
    updateQuantity,
    giftMessage,
    setGiftMessage,
  } = useCart();

  const hasItems = items.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            variants={backdropVariants}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[color:#f6f1e8] text-[color:#111827] shadow-2xl"
            variants={drawerVariants}
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 26,
              mass: 0.9,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
              <div>
                <p className="font-heading text-sm tracking-[0.22em] text-[color:#374151]">
                  Your Gift Box
                </p>
              </div>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[color:#4b5563] shadow-sm transition hover:bg-white"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!hasItems && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-[color:#6b7280]">
                  <ShoppingBag className="h-10 w-10 text-[color:#d1d5db]" />
                  <div className="space-y-1">
                    <p className="font-heading text-sm tracking-[0.18em] uppercase">
                      Your gift box is currently empty
                    </p>
                    <p className="text-xs">
                      Add a bouquet, hat box, candle or plant to begin curating
                      your Le Cadeau experience.
                    </p>
                  </div>
                  <Link
                    href="/#featured"
                    onClick={closeCart}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:#374151] underline-offset-4 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}

              {hasItems && (
                <>
                  <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-black/5 bg-white/80 p-3"
                    >
                      <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-[color:#e5e7eb]">
                        <SafeImage
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          fallbackClassName="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[color:#e5e7eb] text-[color:#6b7280]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-heading text-xs tracking-[0.16em] text-[color:#111827]">
                            {item.name}
                          </p>
                          {item.category && (
                            <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.26em] text-[color:#9ca3af]">
                              {item.category}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs font-semibold text-brand-gold">
                            {item.price}
                          </p>
                          <div className="inline-flex items-center gap-0 rounded-full border border-black/10 bg-[color:#f9fafb]">
                            <button
                              aria-label="Decrease quantity"
                              className="flex h-7 w-7 items-center justify-center text-[color:#4b5563] hover:text-[color:#111827]"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.75rem] text-center text-[0.7rem] font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              className="flex h-7 w-7 items-center justify-center text-[color:#4b5563] hover:text-[color:#111827]"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                  {/* Add a Gift Message */}
                  <div className="mt-6 space-y-2">
                    <label
                      htmlFor="cart-gift-message"
                      className="block font-heading text-[0.7rem] uppercase tracking-[0.28em] text-[color:#374151]"
                    >
                      Add a Gift Message
                    </label>
                    <textarea
                      id="cart-gift-message"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write a personal message to accompany your gift..."
                      rows={3}
                      className="w-full resize-none rounded-xl border-2 border-brand-gold/60 bg-white/90 px-4 py-3 text-sm text-[color:#111827] placeholder:text-[color:#9ca3af] focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                    />
                    <p className="mt-1 text-right text-[0.65rem] text-[color:#6b7280]">
                      {giftMessage.length}/250 characters
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Bottom section — subtotal updates live when quantities change */}
            <div className="border-t border-black/5 bg-white/90 px-6 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-[color:#4b5563]">Subtotal</span>
                <span className="font-heading text-base tabular-nums text-[color:#111827]">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <Link
                href={hasItems ? "/checkout" : "#"}
                onClick={(event) => {
                  if (!hasItems) {
                    event.preventDefault();
                    return;
                  }
                  closeCart();
                }}
                aria-disabled={!hasItems}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:#0b3b2e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold shadow-[0_18px_55px_rgba(0,0,0,0.25)] transition hover:bg-[color:#14553a] ${
                  !hasItems ? "cursor-not-allowed opacity-60" : ""
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

