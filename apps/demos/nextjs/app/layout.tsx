"use client";
import "./globals.css";
import type { JSX } from "react";
import { Provider } from "@/components/Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
