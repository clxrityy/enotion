import { Suspense } from "react";
import { Navigation } from "@/components/layout/Navigation";

export default function Home() {
  return (
    <main className="text-inherit">
      <Suspense fallback={<div className="w-screen h-auto animate-pulse" />}>
        <Navigation />
      </Suspense>
    </main>
  );
}
