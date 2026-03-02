"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FleurDeLis } from "@/components/fleur-de-lis";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type PaymentStatus = {
  success: boolean;
  status: string;
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
};

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const tapId = searchParams.get("tap_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    if (!tapId) {
      setError("Missing payment reference.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/tap/verify?tap_id=${encodeURIComponent(tapId)}`);
        if (!res.ok) {
          setError("Unable to verify payment at this time.");
          setLoading(false);
          return;
        }
        const data = (await res.json()) as PaymentStatus;
        setPayment(data);
      } catch (e) {
        console.error("Error verifying payment", e);
        setError("An unexpected error occurred while verifying your payment.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [tapId]);

  const isSuccess = payment?.success;

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,#D4AF37,transparent_60%)] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full space-y-6 rounded-3xl border border-brand-gold/30 bg-[color:rgba(5,16,11,0.96)] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.85)]"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/40 bg-[color:rgba(5,16,11,0.95)] shadow-[0_18px_55px_rgba(0,0,0,0.7)]">
              <FleurDeLis
                size={30}
                strokeWidth={1.6}
                className={
                  loading
                    ? "text-brand-gold animate-pulse"
                    : isSuccess
                    ? "text-brand-gold"
                    : "text-[color:#f97373]"
                }
              />
            </div>

            {loading && (
              <>
                <p className="font-heading text-xs uppercase tracking-[0.34em] text-brand-gold">
                  Verifying Payment
                </p>
                <p className="max-w-md text-sm text-[color:#f6f1e8]/75">
                  Please wait while we confirm your payment with our payment partner.
                </p>
              </>
            )}

            {!loading && error && (
              <>
                <p className="font-heading text-xs uppercase tracking-[0.34em] text-[color:#f97373]">
                  Payment Check Failed
                </p>
                <p className="max-w-md text-sm text-[color:#f6f1e8]/75">
                  {error}
                </p>
              </>
            )}

            {!loading && !error && payment && isSuccess && (
              <>
                <p className="font-heading text-xs uppercase tracking-[0.34em] text-brand-gold">
                  Payment Successful
                </p>
                <h1 className="mt-2 font-heading text-2xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[1.85rem]">
                  Your order is now confirmed.
                </h1>
                <div className="mt-4 w-full max-w-md space-y-2 rounded-2xl border border-white/10 bg-[color:rgba(4,15,11,0.9)] p-4 text-left text-sm text-[color:#f6f1e8]/85">
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:#9ca3af]">Order ID</span>
                    <span className="font-semibold text-brand-gold">
                      {payment.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:#9ca3af]">Amount</span>
                    <span>
                      {payment.amount.toFixed(2)} {payment.currency}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:#9ca3af]">Customer</span>
                    <span>{payment.customerName || "-"}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:#9ca3af]">Email</span>
                    <span>{payment.customerEmail || "-"}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:#9ca3af]">Status</span>
                    <span>{payment.status}</span>
                  </div>
                </div>
              </>
            )}

            {!loading && !error && payment && !isSuccess && (
              <>
                <p className="font-heading text-xs uppercase tracking-[0.34em] text-[color:#f97373]">
                  Payment Failed
                </p>
                <p className="max-w-md text-sm text-[color:#f6f1e8]/75">
                  Unfortunately we could not confirm your payment. You can try again or
                  contact our client care team with your order reference.
                </p>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-brand-gold/35 px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10"
            >
              Back to Home
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-full bg-[color:#0b3b2e] px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold shadow-[0_18px_55px_rgba(0,0,0,0.6)] hover:bg-[color:#14553a]"
            >
              Retry Payment
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

