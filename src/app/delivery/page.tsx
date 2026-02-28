"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function DeliveryPage() {
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
              Delivery Information
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Delivery &amp; Logistics
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              Le Cadeau is based in the heart of Amman, situated between the  {" "}
          <span className="font-semibold">3rd</span>{" "}
          <span className="font-semibold">and 4th Circles</span>. We deliver directly from our atelier to your door, ensuring each bouquet and hat box arrives exactly as
              it left our workbench.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[color:#f6f1e8]/75">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Same-Day Delivery
              </p>
              <p>
                We offer{" "}
                <span className="font-semibold text-brand-gold">
                  same-day delivery across central Amman districts for orders
                  placed before 2pm
                </span>
                . Orders received after 2pm are scheduled for the next
                available delivery window.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Central Districts
              </p>
              <p>
                Our Central Districts include key neighbourhoods such as{" "}
                <span className="font-semibold">Jabal Amman</span>,{" "}
                <span className="font-semibold">Shmeisani</span>,{" "}
                <span className="font-semibold">Abdoun</span>, and their
                surrounding areas. If you are unsure whether your address falls
                within our same-day radius, our concierge team will be pleased
                to assist.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Presentation &amp; Handling
              </p>
              <p>
                Each delivery is handled by trained drivers who understand the
                delicacy of couture florals. Bouquets travel upright in
                temperature-conscious vehicles, and indoor plants are secured to
                preserve their silhouette from atelier to doorstep.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

