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
      {
        name: "cn",
        slug: "cn",
        description: "Utility for merging class names",
        tag: "utility",
      },
      {
        name: "colors",
        slug: "colors",
        description:
          "Color manipulation utilities, palette types and interfaces",
        tag: ["utility", "constant"],
      },
      {
        name: "createContextFactory",
        slug: "create-context-factory",
        description: "Factory for creating React contexts",
        tag: ["utility", "context"],
      },
      {
        name: "layout",
        slug: "layout-context",
        description: "Layout context for managing layout state",
        tag: "context",
      },
    ],
  },
  {
    name: "@enotion/hooks",
    slug: "hooks",
    description: "Custom React hooks for state management and theming",
    modules: [
      {
        name: "useAnimatedModals",
        slug: "use-animated-modals",
        description: "Hook for managing and animating modals through the layout context",
        tag: "hook",
      },
      {
        name: "useClipboard",
        slug: "use-clipboard",
        description: "Hook for managing clipboard operations",
        tag: "hook",
      },
      {
        name: "useColorPalette",
        slug: "use-color-palette",
        description: "Hook for managing color palettes and themes",
        tag: "hook",
      },
      {
        name: "useElementSize",
        slug: "use-element-size",
        description: "Hook for tracking the size of a DOM element",
        tag: "hook",
      },
      {
        name: "useEventListener",
        slug: "use-event-listener",
        description: "Hook for adding and removing event listeners",
        tag: "hook",
      },
      {
        name: "useFetch",
        slug: "use-fetch",
        description: "Hook for fetching data and inferring data types",
        tag: "hook",
      },
      {
        name: "useLocalStorage",
        slug: "use-local-storage",
        description: "Hook for managing state synchronized with localStorage",
        tag: "hook",
      },
      {
        name: "useOutsideClick",
        slug: "use-outside-click",
        description: "Hook for detecting clicks outside a specified element",
        tag: "hook",
      },
      {
        name: "usePreload",
        slug: "use-preload",
        description: "Hook for preloading resources",
        tag: "hook",
      },
      {
        name: "useScreenSize",
        slug: "use-screen-size",
        description: "Hook for tracking the size of the viewport",
        tag: "hook",
      },
      {
        name: "useScript",
        slug: "use-script",
        description: "Hook for dynamically loading external scripts",
        tag: "hook",
      },
      {
        name: "useSearch",
        slug: "use-search",
        description: "Hook for searching and filtering data",
        tag: "hook",
      },
      {
        name: "useSVG",
        slug: "use-svg",
        description: "Hook for loading and manipulating SVGs",
        tag: "hook",
      },
      {
        name: "useTheme",
        slug: "use-theme",
        description: "Hook for managing application theme",
        tag: "hook",
      },
      {
        name: "useVisibility",
        slug: "use-visibility",
        description: "Hook for tracking the visibility of a DOM element",
        tag: "hook",
      }
    ],
  },
  {
    name: "@enotion/components",
    slug: "components",
    description: "Reusable React components for building user interfaces",
    modules: [
      {
        name: "AnimatedModal",
        slug: "animated-modal",
        description: "Animated modal component for displaying content in a modal dialog with smooth transitions",
        tag: "component",
      },
      {
        name: "Button",
        slug: "button",
        description: "Customizable button component with variants",
        tag: "component",
      },
      {
        name: "Card",
        slug: "card",
        description: "Card component for displaying content in a styled container",
        tag: "component",
      },
      {
        name: "CopyButton",
        slug: "copy-button",
        description: "Button component for copying text to clipboard",
        tag: "component",
      },
      {
        name: "Input",
        slug: "input",
        description: "Styled input component for user text input",
        tag: "component",
      },
      {
        name: "LayoutProvider",
        slug: "layout-provider",
        description: "Context provider for managing layout state and rendering",
        tag: "component",
      },
      {
        name: "Link",
        slug: "link",
        description: "Styled link component for navigation",
        tag: "component",
      },
      {
        name: "Modal",
        slug: "modal",
        description: "Modal component for displaying content in a dialog",
        tag: "component",
      },
      {
        name: "Navbar",
        slug: "navbar",
        description: "Navigation bar component for application headers",
        tag: "component",
      },
      {
        name: "Popover",
        slug: "popover",
        description: "Popover component for displaying contextual information",
        tag: "component",
      },
      {
        name: "Provider",
        slug: "provider",
        description: "Context provider for theme and color palette management",
        tag: "component",
      },
      {
        name: "Search",
        slug: "search",
        description: "Search component for filtering and displaying data",
        tag: "component",
      },
      {
        name: "Select",
        slug: "select",
        description: "Dropdown select component for choosing options",
        tag: "component",
      },
      {
        name: "Skeleton",
        slug: "skeleton",
        description: "Skeleton loading component for indicating loading states",
        tag: "component",
      },
      {
        name: "Wrapper",
        slug: "wrapper",
        description: "Wrapper component for consistent styling and layout",
        tag: "component",
      },
    ],
  },
  {
    name: "@enotion/notify",
    slug: "notify",
    description: "Notification system for displaying alerts and messages",
    modules: [
      {
        name: 'useNotify',
        slug: 'use-notify',
        description: 'Hook for managing notifications',
        tag: 'hook',
      },
      {
        name: 'NotifyProvider',
        slug: 'notify-provider',
        description: 'Context provider for notification system',
        tag: 'component',
      }
    ],
  },
  {
    name: "@enotion/server",
    slug: "server",
    description: "Server-side utilities and middleware for enotion",
    modules: [
      {
        name: "getLocalIps",
        slug: "get-local-ips",
        description: "Utility to retrieve local IP addresses",
        tag: ["network", "utility"],
      },
      {
        name: "getHostname",
        slug: "get-hostname",
        description: "Utility to retrieve the system hostname",
        tag: ["network", "utility"],
      },
      {
        name: "isPortOpen",
        slug: "is-port-open",
        description: "Utility to check if a network port is open",
        tag: ["network", "utility"],
      },
      {
        name: "findOpenPort",
        slug: "find-open-port",
        description: "Utility to find an open network port",
        tag: ["network", "utility"],
      },
      {
        name: "cpuUsage",
        slug: "cpu-usage",
        description: "Utility function to return the current CPU usage array",
        tag: ["system", "utility", "cpu"],
      },
      {
        name: "parseCpuUsage",
        slug: "parse-cpu-usage",
        description: "Utility function to parse CPU usage data into a percentage string",
        tag: ["system", "utility", "cpu"],
      },
      {
        name: "cpuTemperature",
        slug: "cpu-temperature",
        description: "Utility function to return the current CPU temperature",
        tag: ["system", "utility", "cpu"],
      },
      {
        name: "parseCpuTemperature",
        slug: "parse-cpu-temperature",
        description: "Utility function to parse CPU temperature data into a string",
        tag: ["system", "utility", "cpu"],
      },
      {
        name: "diskUsage",
        slug: "disk-usage",
        description: "Utility function to retrieve disk usage information for a given path",
        tag: ["system", "utility"],
      },
      {
        name: "memoryUsage",
        slug: "memory-usage",
        description: "Utility function to retrieve memory usage information",
        tag: ["system", "utility"],
      },
      {
        name: "os",
        slug: "os",
        description: "Utility function to retrieve operating system information",
        tag: ["system", "utility"],
      },
      {
        name: "performance",
        slug: "performance",
        description: "Utility function to retrieve system performance metrics",
        tag: ["system", "utility"],
      },
      {
        name: "uptime",
        slug: "uptime",
        description: "Utility function to retrieve system uptime information",
        tag: ["system", "utility"],
      },
      {
        name: "getSystemSnapshot",
        slug: "get-system-snapshot",
        description: "Utility function to retrieve a snapshot of the current system information",
        tag: ["system", "utility"],
      }
    ],
  },
];

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
