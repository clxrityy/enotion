import { Mulish } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "enotion",
  description: "A turbo-powered monorepo for building modern web applications.",
};

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 animate-pulse" />
          }
        >
          <Provider>{children}</Provider>
        </Suspense>
      </body>
    </html>
  );
}
