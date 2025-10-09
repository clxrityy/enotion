# Changelog

All notable changes to this project will be documented in this file.

## Unreleased - UNRELEASED

### Added

- (global) Initialized project
- (hooks) Initialized package
- (global) Biome configurations
- (config) Initialized config package (for configurations throughout the entire repo)
- (hooks) Set up test environment with jest
- (hooks) Added `createContextFactory()` hook
- (hooks) Added `useFetch()` hook
- (hooks) Added `usePreload()` hook
- (hooks) Added `useLocalStorage()` hook
- (hooks) Added `@testing-library/react` dev dependency for testing React hooks
- (hooks) Added `useEventListener()` hook
- (global) Added log script to simplify command line changes with autochange
- (hooks) Added `useTheme()` hook
- (hooks) Added `useScript()` hook
- (hooks) Added `useVisibility()` hook
- (hooks) Added `useOutsideClick()` hook
- (hooks) Added `useScreenSize()` hook
- (hooks) Added `useElementSize()` hook
- (components) Initialized package
- (components) Added `<Skeleton />` & `<SkeletonWrapper />` component(s)
- (server) Initialized package
- (server) Added `getSystemSnapshot()` function to get a snapshot of the system information
  - (server) Added system information utilities
  - (server) Added CPU information utilities
  - (server) Added Memory information utilities
  - (server) Added OS information utilities
  - (server) Added Performance information utilities
- (server) Added network utilities
  - (server) Added `getLocalIps()` function to get local IP addresses
  - (server) Added `getHostname()` function to get the system hostname
  - (server) Added `isPortAvailable()` function to check if a port is available
  - (server) Added `findAvailablePort()` function to find an available port
- (server) Added `execAsync()` utility to execute shell commands asynchronously
- (server) Added `bytesToGB()` utility to convert bytes to gigabytes

### Changed

- (config) Moved typescript-config into a config package (@enotion/config/typescript)
- (config) Moved jest-config into a config package (@enotion/config/jest)
- (config) Added tsup-config into a config package (@enotion/config/tsup)
- (global) Replaced Prettier & ESLint with Biome
- (global) Adjusted some linting rules
- (hooks) More extensive and concise JSDoc comments for usage

### Removed

- (global) Prettier
- (global) ESLint
