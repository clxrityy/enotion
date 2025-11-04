import { packages } from "./data";
import { DocPackage, DocModule } from "./types";

export function getPackageBySlug(slug: string): DocPackage | undefined {
  return packages.find((pkg) => pkg.slug === slug);
}

export function getAllPackages(): DocPackage[] {
  return packages;
}

export function getModuleBySlug(
  packageSlug: string,
  moduleSlug: string,
): DocModule | undefined {
  const pkg = getPackageBySlug(packageSlug);
  return pkg?.modules.find((mod) => mod.slug === moduleSlug);
}

export function getAllModules(packageSlug: string): DocModule[] | undefined {
  const pkg = getPackageBySlug(packageSlug);
  return pkg?.modules;
}

export type SearchablePackageItems = {
  name: string;
  description: string;
  slug: string;
  type?: "module" | "package";
  package?: string;
  tag?: string | string[];
}[];

export function getSearchableItems(rootSlug?: string): SearchablePackageItems {
  const items: SearchablePackageItems = [];

  // Don't filter packages - rootSlug is just a URL prefix
  const pkgs = packages;

  for (const pkg of pkgs) {
    items.push(
      ...pkg.modules.map(
        (mod) =>
          ({
            name: mod.name,
            description: mod.description,
            slug: `${rootSlug || ""}/${pkg.slug}/${mod.slug}`,
            type: "module",
            package: pkg.name,
            tag: mod.tag,
          }) as SearchablePackageItems[number],
      ),
    );
  }

  items.push(
    ...pkgs.map(
      (pkg) =>
        ({
          name: pkg.name,
          description: pkg.description,
          slug: `${rootSlug || ""}/${pkg.slug}`,
          type: "package",
        }) as SearchablePackageItems[number],
    ),
  );

  return items;
}
