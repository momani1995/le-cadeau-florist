import Link from "next/link";
import { FleurDeLis } from "@/components/fleur-de-lis";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-gold/10 bg-[color:#050b08]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <FleurDeLis
                size={26}
                strokeWidth={1.4}
                className="text-brand-gold/80"
              />
              <span className="font-heading text-xs uppercase tracking-[0.32em] text-brand-gold/80">
                Le Cadeau
              </span>
            </div>
            <p className="max-w-xs text-xs text-[color:#f6f1e8]/60">
              Maison de fleurs &amp; cadeaux, curating cinematic gestures in
              forest green and gold.
            </p>
          </div>

          <div className="grid flex-1 gap-8 text-[0.8rem] text-[color:#e5e7eb]/80 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold/90">
                The House
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/atelier"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    The Atelier
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold/90">
                Customer Care
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/delivery"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/care-guide"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-brand-gold/90">
                Legal
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors duration-200 hover:text-brand-gold"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-4">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[color:#9ca3af]">
            Le Cadeau · Maison de Fleurs &amp; Cadeaux
          </p>
        </div>
      </div>
    </footer>
  );
}

