import { FleurDeLis } from "@/components/fleur-de-lis";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-gold/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 lg:px-8">
        <FleurDeLis
          size={28}
          strokeWidth={1.4}
          className="text-brand-gold/50"
        />
        <p className="font-heading text-[0.65rem] uppercase tracking-[0.4em] text-[color:#f6f1e8]/40">
          Le Cadeau · Maison de Fleurs &amp; Cadeaux
        </p>
      </div>
    </footer>
  );
}

