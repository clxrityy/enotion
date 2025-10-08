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
