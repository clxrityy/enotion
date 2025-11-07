import { notFound } from "next/navigation";
import { getPackageBySlug, getAllPackages } from "@enotion/core/lib";
import fs from "node:fs";
import path from "node:path";
import { MDXContent } from "./components";

export function generateStaticParams() {
  const packages = getAllPackages();
  const params: { package: string; module: string }[] = [];

  for (const pkg of packages) {
    for (const mod of pkg.modules) {
      params.push({ package: pkg.slug, module: mod.slug });
    }
  }
  return params;
}

export default async function PackageModulePage({
  params,
}: {
  params: Promise<{ package: string; module: string }>;
}) {
  const slugs = await params;
  const pkg = getPackageBySlug(slugs.package);

  if (!pkg) {
    notFound();
  }

  const module = pkg.modules.find((mod) => mod.slug === slugs.module);

  if (!module) {
    notFound();
  }

  const mdxPath = path.join(
    process.cwd(),
    "content/docs",
    slugs.package,
    `${slugs.module}.mdx`,
  );

  const hasMdx = fs.existsSync(mdxPath);

  if (hasMdx) {
    return <MDXContent pkg={slugs.package} mod={slugs.module} />;
  }
}
