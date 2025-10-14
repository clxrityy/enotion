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

##### Hooks (`@enotion/hooks`)

- (**added**) Initialized package
- (**added**) Set up test environment with jest
- (**added**) Added `createContextFactory()` hook
- (**added**) Added `useFetch()` hook
- (**added**) Added `usePreload()` hook
- (**added**) Added `useLocalStorage()` hook
- (**added**) Added `@testing-library/react` dev dependency for testing React hooks
- (**added**) Added `useEventListener()` hook
- (**added**) Added `useTheme()` hook & `<ThemeProvider />` for managing themes
- (**added**) Added `useScript()` hook
- (**added**) Added `useVisibility()` hook
- (**added**) Added `useOutsideClick()` hook
- (**added**) Added `useScreenSize()` hook
- (**added**) Added `useElementSize()` hook
- (**changed**) More extensive and concise JSDoc comments for usage
- (**added**) Added `useColorPalette()` hook & `<ColorPaletteProvider />` for managing color palettes (temporary disabled)
- (**added**) Added `useSearch()` hook for managing search functionality

##### Components (`@enotion/components`)

- (**added**) Initialized package
- (**added**) Added `<Skeleton />` & `<SkeletonWrapper />` component(s)
- (**added**) Added `<Button />` component
- (**added**) Added `<Input />` component
- (**added**) Added `<Link />` component
- (**added**) Added `<Select />` component
- (**added**) Added `<Card />` component
- (**added**) Added CSS files for each component in a `styles/` folder
- (**added**) Added `colorPalette` prop to components for easy color customization
- (**added**) Added `<Search />` component for searching through data

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

#### Notify (`@enotion/notify`)

- (**added**) Initialized package
