"use client";
import { DocLayout } from "./components";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DocLayout>{children}</DocLayout>;
}
