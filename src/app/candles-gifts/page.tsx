import { Suspense } from "react";
import { CandlesGiftsPageClient } from "./candles-gifts-client";

export const dynamic = "force-dynamic";

export default function CandlesGiftsPage() {
  return (
    <Suspense fallback={<CandlesGiftsPageSkeleton />}>
      <CandlesGiftsPageClient />
    </Suspense>
  );
}

function CandlesGiftsPageSkeleton() {
  return (
    <div className="relative isolate min-h-[50vh]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1.4fr] lg:items-center">
          <div className="h-48 animate-pulse rounded-2xl bg-[color:rgba(7,19,14,0.6)]" />
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-[color:rgba(7,19,14,0.6)]" />
        </div>
      </div>
    </div>
  );
}
