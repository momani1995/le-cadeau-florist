import { Suspense } from "react";
import { IndoorPlantsPageClient } from "./indoor-plants-client";

export const dynamic = "force-dynamic";

export default function IndoorPlantsPage() {
  return (
    <Suspense fallback={<IndoorPlantsPageSkeleton />}>
      <IndoorPlantsPageClient />
    </Suspense>
  );
}

function IndoorPlantsPageSkeleton() {
  return (
    <div className="relative isolate min-h-[50vh]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1.3fr] lg:items-center">
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-[color:rgba(7,19,14,0.6)]" />
          <div className="h-48 animate-pulse rounded-2xl bg-[color:rgba(7,19,14,0.6)]" />
        </div>
      </div>
    </div>
  );
}
