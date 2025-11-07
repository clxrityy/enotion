import { Metadata } from "next";
import "./index.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ package: string; module: string }>;
}): Promise<Metadata> {
  const { getModuleBySlug, getPackageBySlug } = await import(
    "@enotion/core/lib"
  );
  const resolvedParams = await params;
  const pkg = getPackageBySlug(resolvedParams.package);
  const mod = getModuleBySlug(resolvedParams.package, resolvedParams.module);

  if (!mod || !pkg) {
    return {};
  }

  return {
    title: `${pkg?.name} | ${mod.name}`,
    description: mod.description,
  };
}

export default function PackageModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
