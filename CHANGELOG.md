# Changelog

All notable changes to this project will be documented in this file.

- [0.1.0](#0.1.0)
  - [GLOBAL](#global)
  - [`@enotion/config`](#config-enotionconfig)
  - [`@enotion/hooks`](#hooks-enotionhooks)
  - [`@enotion/components`](#components-enotioncomponents)
  - [`@enotion/server`](#server-enotionserver)
  - [`@enotion/core`](#core-enotioncore)
  - [`@enotion/notify`](#notify-enotionnotify)

---

## 0.1.0

##### GLOBAL

- (**added**) Initialized project
- (**added**) Biome configurations
- (**added**) Added log script to simplify command line changes with autochange
- (**changed**) Replaced Prettier & ESLint with Biome
- (**changed**) Adjusted some linting rules
- (**changed**) Replaced log script with new version script to automate versioning across all packages

##### Config (`@enotion/config`)

- (**added**) Initialized config package (for configurations throughout the entire repo)
- (**changed**) Moved typescript-config into a config package (@enotion/config/typescript)
- (**changed**) Moved jest-config into a config package (@enotion/config/jest)
- (**changed**) Added tsup-config into a config package (@enotion/config/tsup)
- (**added**) Added constants into a config package (@enotion/config/constants)
  - (**added**) Added color constants
- (**changed**) Updated package.json exports to reflect neater import paths
- (**changed**) Updated TypeScript `base` config to include ESNext in library target
- (**changed**) Updated tsup config to build .mts files for ESM support
- (**changed**) Moved constants/utils to new package (`@enotion/core`)
- (**removed**) Removed build environment
  - (**removed**) Removed `@enotion/config/env`
  - (**removed**) `tsup.config.ts` no longer builds `src/env/index.ts`

##### Hooks (`@enotion/hooks`)

- (**added**) Initialized package
- (**added**) Set up test environment with jest
- (**added**) current hooks:
  - `useFetch()`
  - `usePreload()`
  - `useLocalStorage()`
  - `useEventListener()`
  - `useTheme()` & `<ThemeProvider />`
  - `useScript()`
  - `useVisibility()`
  - `useOutsideClick()`
  - `useScreenSize()`
  - `useElementSize()`
  - `useColorPalette()` & `<ColorPaletteProvider />`
  - `useSearch()`
  - `useClipboard()`
  - `useAnimatedModals()`
- (**added**) Added `@testing-library/react` dev dependency for testing React hooks
- (**changed**) More extensive and concise JSDoc comments for usage

##### Components (`@enotion/components`)

- (**added**) Initialized package
- (**added**)
- (**added**) current components:
  - `<Skeleton />` & `<SkeletonWrapper />`
  - `<Button />`
  - `<Input />`
  - `<Link />`
  - `<Select />`
  - `<Card />`
  - `<Search />`
  - `<LayoutContainer />`
  - `<CopyButton />`
  - `<Navbar />`
  - `<Popover />`
  - `<LayoutProvider />`
- (**added**) Added CSS files for each component in a `styles/` folder
- (**added**) Added `colorPalette` prop to components for easy color customization
- (**changed**) Replaced the need for multiple providers by condensing them to one `<LayoutProvider />` component
  - Utilizes the `LayoutContextProvider` & `LayoutRenderer` from [`@enotion/core/contexts`](#config-enotionconfig)

##### Server (`@enotion/server`)

- (**added**) Initialized package
- (**added**) Added `getSystemSnapshot()` function to get a snapshot of the system information
  - (**added**) Added system information utilities
  - (**added**) Added CPU information utilities
  - (**added**) Added Memory information utilities
  - (**added**) Added OS information utilities
  - (**added**) Added Performance information utilities
  - (**added**) Added Disk information utilities
- (**added**) Added network utilities
  - (**added**) Added `getLocalIps()` function to get local IP addresses
  - (**added**) Added `getHostname()` function to get the system hostname
  - (**added**) Added `isPortAvailable()` function to check if a port is available
  - (**added**) Added `findAvailablePort()` function to find an available port
- (**added**) Added `execAsync()` utility to execute shell commands asynchronously
- (**added**) Added `bytesToGB()` utility to convert bytes to gigabytes

##### Core (`@enotion/core`)

- (**added**) Initialized package (for core utilities, constants, and contexts shared across other packages)
- (**added**) Added `createContextFactory()` utility for creating React context with ease
- (**added**) `/contexts` export folder for shared contexts
  - (**added**) Added `LayoutContext` for managing layout-related state

#### Notify (`@enotion/notify`)

- (**added**) Initialized package
- (**added**) Added `NotificationProvider` component to wrap the application
- (**added**) Added `useNotify` hook for triggering notifications
- (**added**) Supports different notification types (success, error, info, warning, loading)
- (**added**) Customizable duration and styles
- (**added**) Dismissible notifications

---
