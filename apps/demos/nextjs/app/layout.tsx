"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { NotificationProvider } from "@enotion/notify";
import "./globals.css";
import "@enotion/notify/index.css";
import type { JSX } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
