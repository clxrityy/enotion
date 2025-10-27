"use client";

import { Navbar, Wrapper, type NavItem } from "@enotion/components";
import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core";
import { useColorPalette, useSVG } from "@enotion/hooks";
import { useRouter } from "next/navigation";
// import { CSSProperties } from "react";

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
      },
    ],
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
  const { push } = useRouter();

  // const colors = palette ? ColorPalettes[palette] : ColorPalettes["default"];

  return (
    <main className="text-inherit w-screen h-screen relative flex flex-col overflow-y-scroll scroll-smooth transition-discrete">
      <Navbar
        palette={palette}
        title="enotion"
        items={items}
        onItemClick={(item) => push(item.href || "/")}
        logo={<Logo palette={palette} />}
        onPaletteChange={setPalette}
      />
      <Wrapper palette={palette} className="py-5 px-4 max-w-3xl">
        {children}
      </Wrapper>
    </main>
  );
}
