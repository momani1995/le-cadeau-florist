"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              This Privacy Policy describes how Le Cadeau collects, uses and
              protects your personal information in accordance with applicable
              Jordanian data and consumer protection laws.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[color:#f6f1e8]/75">
            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                1. Information We Collect
              </h2>
              <p>
                We collect personal information that you provide directly to us,
                including your name, contact details, delivery addresses,
                payment-related information (processed securely by our payment
                partners) and any messages or notes you include with an order.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used to create and deliver your orders,
                communicate with you about your purchase, and, where permitted,
                share news about Le Cadeau collections and services. We do not
                sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                3. Third-Party Services
              </h2>
              <p>
                We work with carefully selected partners for payment processing,
                logistics and analytics. These partners process your data only
                to the extent necessary to perform their services and are
                required to protect your information under applicable Jordanian
                law.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                4. Your Rights
              </h2>
              <p>
                In line with Jordanian consumer and data protection regulations,
                you may request access to, correction of, or deletion of your
                personal information, subject to certain legal and contractual
                limitations. To exercise these rights, please contact our client
                care team.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                5. Contact
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how Le
                Cadeau handles your data, please reach out to us via the contact
                details provided on our website.
              </p>
            </section>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

