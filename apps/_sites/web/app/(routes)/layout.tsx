"use client";

import { Navbar, Wrapper, type NavItem } from "@enotion/components";
import { cn, Icons } from "@enotion/core";
import { useColorPalette } from "@enotion/hooks";
import { useRouter } from "next/navigation";
import { Logo } from "./components";

const items: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Packages",
    href: "/packages",
    main: {
      icon: Icons.Package,
      description: "Explore the enotion packages",
      href: "/packages",
      heading: "Packages",
    },
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
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { palette, setPalette } = useColorPalette();
  const { push } = useRouter();

  return (
    <main
      className={cn(
        "text-inherit w-screen h-screen relative flex flex-col overflow-y-scroll scroll-smooth transition-discrete",
        palette === "monochrome" && "saturate-[200] -bg-conic-30 grayscale",
      )}
    >
      <Navbar
        palette={palette}
        title="enotion"
        items={items}
        onItemClick={(item) => push(item.href || "/")}
        logo={<Logo palette={palette} />}
        logoHref="/"
        onPaletteChange={setPalette}
      />
      <Wrapper palette={palette} className="py-5 px-4 max-w-3xl">
        {children}
      </Wrapper>
    </main>
  );
}
