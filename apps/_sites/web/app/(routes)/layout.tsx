"use client";

import { Navbar, Wrapper, type NavItem } from "@enotion/components";
import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core";
import { useColorPalette, useSVG } from "@enotion/hooks";

const items: NavItem[] = [
  {
    label: "Home",

  },
  {
    label: "Packages",
    subItems: [
      {
        label: "Hooks",
        description: "Reusable React hooks for enotion",
        href: "/packages/hooks",
        icon: Icons.Hooks,
      },
      {
        label: "Components",
        description: "UI components for building enotion apps",
        href: "/packages/components",
        icon: Icons.Components,
      },
      {
        label: "Core",
        description: "Core utilities, constants, and contexts for enotion",
        href: "/packages/core",
        icon: Icons.Core,
      },
      {
        label: "Notify",
        description: "Notification system for enotion apps",
        href: "/packages/notify",
        icon: Icons.Notifications,
      },
      {
        label: "Server",
        description: "Server-side utilities for enotion",
        href: "/packages/server",
        icon: Icons.Server,
      }
    ]
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
        title="enotion"
        items={items}
        logo={<Logo palette={palette} />}
        onPaletteChange={setPalette}
      />
      <Wrapper palette={palette}>{children}</Wrapper>
    </main>
  );
}
