"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CareGuidePage() {
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
              Care Guide
            </p>
            <h1 className="font-heading text-3xl tracking-[0.12em] text-[color:#f6f1e8] sm:text-[2rem]">
              Luminous Longevity
            </h1>
            <p className="text-sm leading-relaxed text-[color:#f6f1e8]/75">
              With the right care, your Le Cadeau pieces will stay radiant long
              after they arrive. Follow these guidelines to preserve the
              silhouette, colour and character of your flowers and plants.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 text-sm leading-relaxed text-[color:#f6f1e8]/75">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Haute Couture Bouquets
              </p>
              <ul className="space-y-2 text-[0.9rem]">
                <li>
                  <span className="font-semibold text-brand-gold">
                    Trim the stems
                  </span>{" "}
                  on arrival by 1–2 cm at a sharp angle, using clean floral
                  shears. Repeat every two to three days to encourage water
                  absorption.
                </li>
                <li>
                  Use{" "}
                  <span className="font-semibold">cool, clean water</span> in a
                  freshly washed vase. Avoid very cold or hot water, which can
                  shock delicate stems.
                </li>
                <li>
                  Remove any foliage that falls below the water line to keep the
                  vase clear and minimise bacteria.
                </li>
                <li>
                  Place your bouquet away from direct sunlight, heating vents
                  and ripening fruit. A calm, temperate room will keep petals
                  luminous for longer.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Indoor Plants
              </p>
              <ul className="space-y-2 text-[0.9rem]">
                <li>
                  <span className="font-semibold text-brand-gold">
                    Olive trees
                  </span>{" "}
                  prefer bright, indirect light — a sunlit window with a sheer
                  curtain is ideal. Allow the top layer of soil to dry slightly
                  between waterings.
                </li>
                <li>
                  <span className="font-semibold text-brand-gold">Fig trees</span>{" "}
                  thrive in filtered light and dislike sudden changes in
                  position. Rotate the pot every few weeks so the canopy grows
                  evenly.
                </li>
                <li>
                  Keep plants away from strong drafts and air conditioning, and
                  wipe leaves gently with a soft cloth to maintain their
                  sculptural sheen.
                </li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

