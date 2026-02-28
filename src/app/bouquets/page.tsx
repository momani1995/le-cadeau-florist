import { Suspense } from "react";
import { BouquetsPageClient } from "./bouquets-client";

export const dynamic = "force-dynamic";

export default function BouquetsPage() {
  return (
    <Suspense fallback={<BouquetsPageSkeleton />}>
      <BouquetsPageClient />
    </Suspense>
  );
}

function BouquetsPageSkeleton() {
  return (
    <div className="relative isolate min-h-[50vh]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1.3fr] lg:items-center">
          <div className="h-48 animate-pulse rounded-2xl bg-[color:rgba(7,19,14,0.6)]" />
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-[color:rgba(7,19,14,0.6)]" />
        </div>
      </div>
    </div>
  );
}

