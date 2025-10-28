export interface DocPackage {
  name: string;
  slug: string;
  description: string;
  modules: DocModule[];
}

export interface DocModule {
  tag: string | string[];
  name: string;
  description: string;
  slug: string;
}

export const packages: DocPackage[] = [
  {
    name: "@enotion/core",
    slug: "core",
    description: "Core utilities, constants, and contexts for enotion",
    modules: [
      { name: 'cn', slug: 'cn', description: 'Utility for merging class names', tag: "utility" },
      { name: 'colors', slug: 'colors', description: 'Color manipulation utilities, palette types and interfaces', tag: ["utility", "constant"] },
      { name: 'createContextFactory', slug: 'create-context-factory', description: 'Factory for creating React contexts', tag: ["utility", "context"] },
      { name: "layout", slug: "layout-context", description: "Layout context for managing layout state", tag: "context" },
    ]
  },
  {
    name: "@enotion/hooks",
    slug: "hooks",
    description: "Custom React hooks for state management and theming",
    modules: [
      { name: 'useLocalStorage', slug: 'use-local-storage', description: 'Hook for managing state synchronized with localStorage', tag: "hook" },
      { name: 'useTheme', slug: 'use-theme', description: 'Hook for accessing and manipulating theme context', tag: "hook" },
      { name: 'useColorPalette', slug: 'use-color-palette', description: 'Hook for managing color palettes', tag: "hook" },
      // finish
    ]
  },
  {
    name: "@enotion/components",
    slug: "components",
    description: "Reusable React components for building user interfaces",
    modules: [
      // finish
    ]
  },
  {
    name: "@enotion/notify",
    slug: "notify",
    description: "Notification system for displaying alerts and messages",
    modules: [
      // finish
    ]
  },
  {
    name: "@enotion/server",
    slug: "server",
    description: "Server-side utilities and middleware for enotion",
    modules: [
      // finish
    ]
  }
];

export function getPackageBySlug(slug: string): DocPackage | undefined {
  return packages.find((pkg) => pkg.slug === slug);
}

export function getAllPackages(): DocPackage[] {
  return packages;
}

export function getModuleBySlug(
  packageSlug: string,
  moduleSlug: string
): DocModule | undefined {
  const pkg = getPackageBySlug(packageSlug);
  return pkg?.modules.find((mod) => mod.slug === moduleSlug);
}

export function getAllModules(packageSlug: string): DocModule[] | undefined {
  const pkg = getPackageBySlug(packageSlug);
  return pkg?.modules;
}

export type SearchablePackageItems = { package: string; module: DocModule, description: string, slug: string }[];

export function getSearchableItems(rootSlug?: string): SearchablePackageItems {
  const items: SearchablePackageItems = [];

  const pkgs = rootSlug
    ? packages.filter((pkg) => pkg.slug === rootSlug)
    : packages;

  for (const pkg of pkgs) {
    for (const mod of pkg.modules) {
      items.push({ package: pkg.name, module: mod, description: mod.description, slug: `${rootSlug}/${pkg.slug}/${mod.slug}` });
    }
  }

  return items;
}
