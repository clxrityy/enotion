"use client";
import { Mulish } from "next/font/google";
import { LayoutProvider } from "@enotion/components";
import "./globals.css";
import { LayoutRenderer } from "@enotion/core";

const mulish = Mulish({
  variable: "--font-mulish",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
        <LayoutProvider>
          <LayoutRenderer />
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
