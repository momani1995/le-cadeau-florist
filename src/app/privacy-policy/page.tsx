"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
                This Privacy Policy explains how Le Cadeau collects, uses and protects
                your information when you visit our website or place an order, in
                accordance with applicable Jordanian data and consumer protection laws.
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
                1. Information We Collect
              </h2>
              <p>
                We collect personal information that you provide directly to us when you
                browse the site, create an order or contact our client care team. This may
                include your name, email address, phone number, delivery address, gift
                recipient details and any notes or messages you choose to include.
              </p>
              <p>
                Payment card details are processed securely by our payment partners (such
                as Tap Payments and card processors) and are not stored in full by Le
                Cadeau.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                2. How We Use Your Information
              </h2>
              <p>
                We use your information to create, prepare and deliver your floral
                orders; to communicate with you about your purchase; to personalise your
                experience; and, where you have consented, to share news about Le Cadeau
                collections, services and seasonal launches.
              </p>
              <p>
                We do not sell your personal information to third parties. We only share
                it with trusted service providers where necessary to fulfil your order
                (for example, couriers, payment processors and technology partners).
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                3. Cookies &amp; Analytics
              </h2>
              <p>
                Our website may use cookies and similar technologies to understand how the
                site is used, to remember your preferences and to improve our digital
                experience. You can adjust your browser settings to refuse some cookies,
                but this may affect how certain features function.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                4. Data Retention &amp; Security
              </h2>
              <p>
                We retain your information only for as long as necessary to provide our
                services and to comply with legal, tax or accounting requirements. We use
                appropriate technical and organisational measures to protect your data
                against unauthorised access, loss or misuse.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                5. Your Rights
              </h2>
              <p>
                Under Jordanian consumer and data protection regulations, you may have the
                right to request access to, correction of or deletion of your personal
                information, subject to certain legal and contractual limitations. To make
                such a request, please contact our client care team using the details on
                our website.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                6. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in
                our practices, legal requirements or services. The revised version will
                be posted on this page with an updated effective date.
              </p>
            </section>

            <section className="space-y-1">
              <h2 className="font-semibold text-[color:#f6f1e8]">
                7. Contact
              </h2>
              <p>
                If you have any questions about how Le Cadeau handles your data, please
                reach out via the contact details provided on our website and our team
                will be pleased to assist.
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

