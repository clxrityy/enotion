import { Mulish } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "enotion",
  description: "A turbo-powered monorepo for building modern web applications.",
  openGraph: {
    title: "enotion",
    description: "A turbo-powered monorepo for building modern web applications.",
    url: "https://enotion-beta.vercel.app/",
    siteName: "enotion",
    type: "website",
    locale: "en-US",
  },
  twitter: {
    card: "summary",
    title: "enotion",
    description: "A turbo-powered monorepo for building modern web applications.",
    creator: "@yourclxrity",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "https://enotion-beta.vercel.app/site.webmanifest",
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
