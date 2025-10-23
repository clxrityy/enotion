"use client";

import { Navbar, type NavItem } from "@enotion/components";
import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core";
import { useColorPalette, useSVG } from "@enotion/hooks";

const items: NavItem[] = [
  {
    label: "Home",
  },
  {
    label: "Docs",
  },
];

const Logo = ({ palette }: { palette?: ColorPaletteType }) => {
  const color = palette ? ColorPalettes[palette] : undefined;

  const { svgContent, error } = useSVG({
    src: "/logo.svg",
    width: 20,
    height: 20,
    strokeColor: color?.foreground,
  });

  if (error) {
    return <Icons.Loading className="w-8 h-8 text-gray-400 animate-spin" />;
  }

  const svgMarkup = svgContent;

  return svgMarkup ? (
    <div
      style={{
        maxHeight: "2rem",
        maxWidth: "2rem",
        position: "relative",
        rotate: "-45deg",
        aspectRatio: "2 / 1.4142",
        animationFillMode: "forwards",
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  ) : (
    <></>
  );
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { palette, setPalette } = useColorPalette();

  return (
    <main className="text-inherit">
      <Navbar
        palette={palette}
        title="My Site"
        items={items}
        logo={<Logo palette={palette} />}
        onPaletteChange={setPalette}
      />
      {children}
    </main>
  );
}
