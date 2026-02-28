"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsPage() {
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
          <div className="space-y-3">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.34em] text-brand-gold">
              Legal
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Terms of Service
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              These Terms of Service govern your use of the Le Cadeau website
              and the purchase of our products, in accordance with Jordanian
              consumer law.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[color:#f6f1e8]/75">
            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                1. Orders &amp; Acceptance
              </h2>
              <p>
                When you place an order with Le Cadeau, you are offering to
                purchase a product subject to these Terms. We reserve the right
                to decline or cancel an order, for example in the case of
                limited stock or circumstances beyond our control. You will be
                notified promptly if we are unable to fulfil your order.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                2. Pricing &amp; Payment
              </h2>
              <p>
                All prices are listed in the currency indicated on the site and
                are inclusive of applicable taxes unless stated otherwise.
                Payment is processed securely through our chosen payment
                providers. Your order is confirmed once payment has been
                successfully authorised.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                3. Delivery
              </h2>
              <p>
                We aim to deliver your order within the time frames stated on
                our Delivery Information page. While we take great care in
                handling each piece, timing may be affected by factors outside
                our control. Risk in the products passes to you upon successful
                delivery to the address provided.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                4. Cancellations &amp; Adjustments
              </h2>
              <p>
                Due to the perishable and bespoke nature of our work, changes or
                cancellations are time-sensitive. Please contact us as soon as
                possible if you need to adjust your order; we will honour your
                request where reasonably possible and in accordance with
                Jordanian consumer protection regulations.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                5. Liability
              </h2>
              <p>
                Le Cadeau&apos;s liability in connection with any order is
                limited to the value of the relevant purchase, except where
                otherwise required under applicable Jordanian law. Nothing in
                these Terms seeks to exclude or limit any statutory rights you
                may have as a consumer.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                6. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the Hashemite Kingdom of
                Jordan. Any disputes arising in relation to your use of the site
                or your purchases will be subject to the exclusive jurisdiction
                of the competent Jordanian courts.
              </p>
            </section>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

