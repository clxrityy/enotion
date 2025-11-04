import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ package: string }>;
}): Promise<Metadata> {
  const { getPackageBySlug } = await import("@enotion/core/lib");
  const resolvedParams = await params;
  const pkg = getPackageBySlug(resolvedParams.package);

  if (!pkg) {
    return {};
  }

  return {
    title: pkg.name,
    description: pkg.description,
  };
}

export default function PackageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
