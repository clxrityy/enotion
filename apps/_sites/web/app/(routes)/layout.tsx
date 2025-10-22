"use client";

import { Navbar, type NavItem } from "@enotion/components";
import { useColorPalette } from "@enotion/hooks";
import Image from "next/image";


const items: NavItem[] = [
  {
    label: "Home",
  },
  {
    label: "Docs",
  }
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { palette, setPalette } = useColorPalette();

  return (
    <main className="text-inherit w-full h-full">
      <Navbar
        palette={palette}
        title="My Site"
        items={items}
        logo={<Image src={'/logo.png'} width={40} height={40} alt="logo" />}
        onPaletteChange={setPalette}
      />
      {children}
    </main>
  );
}
