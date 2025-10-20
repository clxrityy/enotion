# Changelog

All notable changes to this project will be documented in this file.

- [0.1.0](#0.1.0)
  - [Global](#global)
  - [Config](#config-enotionconfig)
  - [Hooks](#hooks-enotionhooks)
  - [Components](#components-enotioncomponents)
  - [Server](#server-enotionserver)
  - [Core](#core-enotioncore)
  - [Notify](#notify-enotionnotify)
  - [API](#api-enotionapi)

## 0.1.0

##### Global

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
- (**changed**) Added `resolvePackageJsonImports` & `resolvePackageJsonImports` to `@enotion/config/typescript/base`
  - (**changed**) This allows for all modules to export their properties for the [`@enotion/api`](#api-enotionapi) package to dynamically import and use.
- (**changed**) `@enotion/config/typescript` is now `@enotion/config/tsconfig`

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
- (**added**) Added CSS files for each component in a `styles/` folder
- (**added**) Added `colorPalette` prop to components for easy color customization
- (**changed**) replaced `<LayoutContainer />` with `<Provider />` component that wraps children with all necessary context providers (Theme, ColorPalette, etc.)

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

- (**added**) Initialized package (for core utilities and constants shared across other packages)
- (**added**) Added `createContextFactory()` utility for creating React context with ease

#### Notify (`@enotion/notify`)

- (**added**) Initialized package
- (**added**) Added `NotificationProvider` component to wrap the application
- (**added**) Added `useNotify` hook for triggering notifications
- (**added**) Supports different notification types (success, error, info, warning, loading)
- (**added**) Customizable duration and styles
- (**added**) Dismissible notifications
