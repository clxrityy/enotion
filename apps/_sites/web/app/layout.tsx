import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/app/AppProviders";
import { AppLayout } from "@/components/app/AppLayout";
import { Suspense } from "react";
import { Navigation } from "@/components/layout/Navigation";

const exo = Exo({
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "enotion",
  description: "An open-source web developer toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.variable} antialiased`}
      >
        <Suspense fallback={<div
          className="w-screen h-screen animate-pulse"
        />}>
          <AppProviders>
            {children}
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
