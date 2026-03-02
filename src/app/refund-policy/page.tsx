"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function RefundPolicyPage() {
  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#173529,transparent_65%)] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6 rounded-3xl border border-brand-gold/30 bg-[color:rgba(5,16,11,0.96)] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-3">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
                Legal
              </p>
              <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
                Refund &amp; Replacement Policy
              </h1>
              <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                Because Le Cadeau works with fresh, perishable flowers and bespoke
                arrangements, our refund approach is designed to be fair, transparent and
                aligned with the nature of luxury floral design.
              </p>
            </div>
            <Link
              href="/"
              className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-gold underline-offset-4 hover:underline sm:inline-block"
            >
              Back to Home
            </Link>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[color:#f6f1e8]/75">
            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                1. Perishable Nature of Our Products
              </h2>
              <p>
                Our bouquets, hat boxes and arrangements are crafted with fresh flowers
                and living materials. For this reason, they are not suitable for return
                once delivered. We do not accept returns of fresh florals or plants
                unless explicitly requested and approved by our client care team.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                2. Quality Concerns on Delivery
              </h2>
              <p>
                Each Le Cadeau piece is inspected before it leaves our atelier. If your
                order arrives damaged, significantly different from the product
                description or in an unsatisfactory condition, please contact us within{" "}
                <span className="font-semibold text-brand-gold">2 hours</span> of
                delivery with clear photographs of the arrangement and packaging.
              </p>
              <p>
                Where we agree that the quality falls below our standards, we will offer
                a replacement arrangement or an appropriate partial refund, at our
                discretion.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                3. Delivery Issues &amp; Incorrect Details
              </h2>
              <p>
                If a delivery is delayed or cannot be completed due to circumstances
                outside our control (such as traffic disruption or access restrictions),
                we will work with you to arrange a suitable alternative delivery window.
              </p>
              <p>
                Please ensure that all recipient details and delivery addresses are
                accurate. We cannot provide a refund where an order cannot be delivered
                due to incorrect or incomplete information supplied at checkout, but we
                will always do our best to assist in resolving the issue.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                4. Cancellations &amp; Changes
              </h2>
              <p>
                Because we begin preparing stems and materials shortly after an order is
                confirmed, cancellations and major changes must be requested as early as
                possible. We cannot guarantee cancellations for same-day orders or orders
                already in preparation, but we will review each request on a
                case-by-case basis.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                5. Non-Refundable Items
              </h2>
              <p>
                The following are generally not eligible for refund: bespoke or fully
                customised floral designs; used or significantly altered arrangements;
                and orders where care instructions provided by Le Cadeau have not been
                followed (for example, failure to refresh water or keep flowers in a
                suitable environment).
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                6. How Refunds Are Processed
              </h2>
              <p>
                Where a refund is approved, it will be processed back to the original
                payment method via our payment partners within a reasonable period. Bank
                processing times may vary, and it may take several business days for the
                funds to appear on your statement.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                7. Contact Us
              </h2>
              <p>
                If you have any concerns about an order or would like to discuss a
                potential refund or replacement, please contact our client care team
                using the contact details on our website. We handle each case with care
                and aim to resolve issues in a way that honours both our standards and
                your occasion.
              </p>
            </section>
          </div>

          <div className="pt-2 sm:hidden">
            <Link
              href="/"
              className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-brand-gold underline-offset-4 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

