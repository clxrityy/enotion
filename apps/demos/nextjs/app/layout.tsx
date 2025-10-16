"use client";
import "./globals.css";
import type { JSX } from "react";
import { Provider } from "@/components/Provider";
import { AppLayout } from "@/components/AppLayout";
import { Telex } from "next/font/google";

const telex = Telex({ weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={telex.className}>
        <Provider>
          <AppLayout>
            {children}
          </AppLayout>
        </Provider>
      </body>
    </html>
  );
}
