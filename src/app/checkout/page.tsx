"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { FleurDeLis } from "@/components/fleur-de-lis";
import { useCart } from "@/components/cart-context";

type PaymentMethod = "card" | "local" | "wallet";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function parsePrice(price: string): number {
  const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export default function CheckoutPage() {
  const { items, totalPrice, giftMessage, setGiftMessage } = useCart();
  const router = useRouter();
  const [isPlacing, setIsPlacing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const [includeMothersDayCard, setIncludeMothersDayCard] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const formRef = useRef<HTMLFormElement | null>(null);

  const hasItems = items.length > 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString().split("T")[0];

  const handleDeliveryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (!value) {
      setDeliveryDate("");
      setDeliveryError("");
      return;
    }

    const selected = new Date(value + "T00:00:00");
    selected.setHours(0, 0, 0, 0);

    const isPast = selected < today;
    const isFriday = selected.getDay() === 5;

    if (isPast) {
      setDeliveryError("Please choose a date from today onwards.");
      return;
    }
    if (isFriday) {
      setDeliveryError(
        "We prepare and deliver Sunday–Thursday. Please choose a different day.",
      );
      return;
    }

    setDeliveryError("");
    setDeliveryDate(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasItems || isPlacing || !deliveryDate || deliveryError) return;

    setIsPlacing(true);
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalPrice,
          giftMessage,
          deliveryDate,
          includeMothersDayCard,
          paymentMethod,
        }),
      });
    } catch (error) {
      // For now we gracefully fall back to client-side success even if the
      // backend is not yet implemented.
      console.error("Error sending checkout data", error);
    } finally {
      setTimeout(() => {
        router.push("/success");
      }, 1400);
    }
  };

  const handlePayNow = async () => {
    if (!hasItems || isPaying) return;
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const customerName =
      (formData.get("fullName") as string | null)?.trim() || "Checkout Customer";
    const customerEmail =
      (formData.get("email") as string | null)?.trim() || "checkout@example.com";

    setIsPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          currency: "JOD",
          customer: {
            name: customerName,
            email: customerEmail,
          },
        }),
      });

      if (!res.ok) {
        console.error("Failed to create Tap charge", res.status);
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Tap response missing URL");
      }
    } catch (error) {
      console.error("Error calling /api/checkout", error);
    } finally {
      setIsPaying(false);
    }
  };

  if (!hasItems) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-brand-gold">
          Checkout
        </p>
        <h1 className="font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8]">
          Your gift box is empty
        </h1>
        <p className="text-sm text-[color:#f6f1e8]/70">
          Add a bouquet, hat box, candle or plant to begin your Le Cadeau
          checkout.
        </p>
        <Link
          href="/#featured"
          className="mt-2 inline-flex items-center justify-center rounded-full border border-brand-gold/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#173529,transparent_65%)] opacity-60 blur-3xl" />
        <div className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#D4AF37,transparent_65%)] opacity-40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 flex items-center justify-between gap-3"
        >
          <div>
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Checkout
            </p>
            <h1 className="mt-2 font-heading text-2xl tracking-[0.14em] text-[color:#f6f1e8] sm:text-[1.75rem]">
              Complete Your Le Cadeau Order
            </h1>
          </div>
          <FleurDeLis
            size={28}
            strokeWidth={1.5}
            className="hidden text-brand-gold/70 lg:block"
          />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Left: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-8 rounded-3xl border border-white/5 bg-[color:rgba(5,16,11,0.95)]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
          >
            <form
              ref={formRef}
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              {/* Delivery Information */}
              <section className="space-y-4">
                <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold">
                  Delivery Information
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Full Name
                    </label>
                    <input
                      required
                      name="fullName"
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                      placeholder="Recipient's name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Phone
                    </label>
                    <input
                      required
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Country
                    </label>
                    <input
                      required
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                      placeholder="Country / Region"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Street Address
                    </label>
                    <input
                      required
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      City
                    </label>
                    <input
                      required
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[color:#f6f1e8]/80">
                      Postal Code
                    </label>
                    <input
                      required
                      className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                    />
                  </div>
                </div>
              </section>

              {/* Gift Customization */}
              <section className="space-y-4">
                <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold">
                  Gift Customization
                </p>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">
                    Handwritten Message
                  </label>
                  <textarea
                    rows={4}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Share a note for our calligrapher to inscribe by hand..."
                    className="w-full resize-none rounded-xl border-2 border-brand-gold/70 bg-[color:#020908] px-3 py-3 text-sm text-[color:#f6f1e8] outline-none placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                  />
                  <p className="mt-1 text-right text-[0.7rem] text-[color:#9ca3af]">
                    {giftMessage.length}/250 characters
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="mothers-day-card"
                    type="checkbox"
                    checked={includeMothersDayCard}
                    onChange={(e) =>
                      setIncludeMothersDayCard(e.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border border-brand-gold/70 bg-[color:#020908] text-brand-gold focus:ring-brand-gold/50"
                  />
                  <label
                    htmlFor="mothers-day-card"
                    className="text-xs text-[color:#f6f1e8]/80"
                  >
                    Include a{" "}
                    <span className="font-semibold">
                      complimentary Mother&apos;s Day card
                    </span>{" "}
                    beautifully hand-lettered with your message.
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[color:#f6f1e8]/80">
                    Requested Delivery Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayIso}
                    value={deliveryDate}
                    onChange={handleDeliveryDateChange}
                    className="w-full rounded-xl border border-white/10 bg-[color:#020908] px-3 py-2 text-sm text-[color:#f6f1e8] outline-none ring-0 placeholder:text-[color:#6b7280] focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40"
                  />
                  {deliveryError && (
                    <p className="mt-1 text-xs text-[color:#f97373]">
                      {deliveryError}
                    </p>
                  )}
                </div>
              </section>

              {/* Payment Method */}
              <section className="space-y-4">
                <div className="space-y-3 rounded-2xl border border-brand-gold/20 bg-[color:rgba(5,16,11,0.95)] p-4 sm:p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-brand-gold" strokeWidth={1.6} />
                      <div>
                        <p className="font-heading text-xs uppercase tracking-[0.3em] text-brand-gold">
                          Payment Method
                        </p>
                        <p className="text-[0.7rem] text-[color:#9ca3af]">
                          All transactions are secure and encrypted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[0.75rem] text-[color:#e5e7eb]/80">
                    <span className="text-[color:#9ca3af]">
                      We accept all major cards and digital wallets via{" "}
                      <span className="font-semibold text-brand-gold">Tap Payments</span>.
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-brand-gold">
                        Visa
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-brand-gold">
                        Mastercard
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-brand-gold">
                        Apple Pay
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-brand-gold">
                        Google Pay
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] text-[color:#9ca3af]">
                <Lock className="h-3.5 w-3.5 text-brand-gold/80" strokeWidth={1.6} />
                <span>Secure 256-bit SSL Encrypted Payment</span>
              </div>

              <button
                type="button"
                disabled={isPaying || !hasItems}
                onClick={handlePayNow}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-gold/40 bg-transparent px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-gold shadow-[0_0_25px_rgba(0,0,0,0.4)] transition hover:bg-[color:rgba(11,59,46,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPaying ? "Redirecting to Payment..." : "Pay Now"}
              </button>

              <button
                type="submit"
                disabled={isPlacing || !hasItems}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:#0b3b2e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold shadow-[0_18px_55px_rgba(0,0,0,0.5)] transition hover:bg-[color:#14553a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPlacing && (
                  <FleurDeLis
                    size={18}
                    strokeWidth={1.5}
                    className="animate-spin text-brand-gold"
                  />
                )}
                {isPlacing ? "Completing Order..." : "Complete Order"}
              </button>
            </form>
          </motion.div>

          {/* Right: Sticky Order Summary */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="space-y-4 rounded-3xl border border-brand-gold/20 bg-[color:rgba(10,26,19,0.96)]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.75)]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold">
                    Order Summary
                  </p>
                  <p className="mt-1 text-xs text-[color:#f6f1e8]/70">
                    {items.length} item{items.length === 1 ? "" : "s"} in your
                    gift box
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-sm">
                {items.map((item) => {
                  const unit = parsePrice(item.price);
                  const lineTotal = unit * item.quantity;
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[color:rgba(4,15,11,0.9)] p-3"
                    >
                      <div className="relative h-16 w-14 overflow-hidden rounded-xl bg-[color:#111827]">
                        <SafeImage
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          fallbackClassName="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[color:#111827] text-[color:#9ca3af]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-1">
                        <p className="font-heading text-xs tracking-[0.16em] text-[color:#f6f1e8]">
                          {item.name}
                        </p>
                        <div className="flex items-center justify-between text-[0.7rem] text-[color:#9ca3af]">
                          <span>
                            Qty {item.quantity}
                            {item.category ? ` · ${item.category}` : ""}
                          </span>
                          <span className="font-semibold text-brand-gold">
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {(() => {
                const deliveryFee = totalPrice > 150 ? 0 : 15;
                const grandTotal = totalPrice + deliveryFee;
                return (
                  <div className="space-y-1 border-t border-white/10 pt-3 text-sm">
                    <div className="flex items-center justify-between text-[color:#e5e7eb]/80">
                      <span>Subtotal</span>
                      <span className="font-heading tabular-nums text-brand-gold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[color:#9ca3af]">
                      <span>Luxury Delivery Fee</span>
                      <span className="font-heading tabular-nums text-brand-gold">
                        {deliveryFee === 0 ? (
                          <>
                            <span className="mr-1 line-through opacity-60">
                              $15.00
                            </span>
                            Complimentary
                          </>
                        ) : (
                          "$15.00"
                        )}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-[color:#e5e7eb]/90">
                      <span className="font-heading">Order Total</span>
                      <span className="font-heading tabular-nums text-brand-gold">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

