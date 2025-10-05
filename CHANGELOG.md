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
- (global) Adjusted some linting rules

### Changed

- (config) Moved typescript-config into a config package (@enotion/config/typescript)
- (config) Moved jest-config into a config package (@enotion/config/jest)
- (config) Added tsup-config into a config package (@enotion/config/tsup)
- (global) Replaced Prettier & ESLint with Biome

### Removed

- (global) Prettier
- (global) ESLint
