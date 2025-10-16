"use client";
import { Navigation } from "@/components/layout/Navigation";
import { useColorPalette } from "@enotion/hooks";


export default function Home() {

  const { palette } = useColorPalette();

  return (
    <main>
      <Navigation colorPalette={palette} />

    </main>
  );
}
