# Changelog

All notable changes to this project will be documented in this file.

---

## 0.1.0 (2025-10-30)

- [core](#enotioncore-v010)
- [hooks](#enotionhooks-v010)
- [components](#enotioncomponents-v010)
- [notify](#enotionnotify-v010)
- [server](#enotionserver-v000)
- [config](#enotionconfig-v100)

### Project Setup

- Initialized monorepo with Turborepo and pnpm workspaces
- Configured Biome for linting and formatting (replacing ESLint and Prettier)
- Set up automated versioning scripts for all packages
- Configured Jest testing environment across all packages

---

### [`@enotion/core`](./packages/@enotion/core) `v0.1.0`

Core utilities, constants, and contexts for the enotion ecosystem.

**Exports:**

- **Constants**: Color palettes, icons (react-icons), palette types
- **Utilities**: `cn()` (class name merger), color manipulation functions (`adjustHexColorOpacity`, `blendHexColors`)
- **Contexts**: `LayoutContext` with provider and renderer, `createContextFactory()` helper
- **Documentation**: Package metadata and searchable module definitions

**Features:**

- Modular exports: `@enotion/core`, `@enotion/core/constants`, `@enotion/core/utils`, `@enotion/core/contexts`
- ESM-first with TypeScript support (.mts)
- Tailwind CSS integration with utility classes
- Zero external dependencies for core utilities

---

### [`@enotion/hooks`](./packages/@enotion/hooks) `v0.1.0`

Collection of reusable React hooks for common patterns.

**Hooks:**

- **State Management**: `useLocalStorage`, `useTheme`, `useColorPalette`, `useAnimatedModals`
- **UI Utilities**: `useSearch`, `useClipboard`, `useVisibility`, `useIsMounted`, `useSVG`
- **Events**: `useEventListener`, `useOutsideClick`
- **Layout**: `useScreenSize`, `useElementSize`
- **Data Fetching**: `useFetch`, `usePreload`
- **Scripts**: `useScript`

**Features:**

- Context providers: `ThemeProvider`, `ColorPaletteProvider`
- Comprehensive JSDoc documentation
- Full TypeScript support with generic types
- 100% test coverage with Jest and React Testing Library

---

### [`@enotion/components`](./packages/@enotion/components) `v0.1.0`

Reusable React UI components with built-in theming and accessibility.

**Components:**

- **Display**: `Card`, `Skeleton`, `Modal`, `AnimatedModal`
- **Navigation**: `Navbar` (with sub-navigation), `Link`, `Popover`
- **Forms**: `Input`, `Select`, `Button`, `CopyButton`, `Search`
- **Layout**: `LayoutProvider`, `Provider`, `Wrapper`

**Features:**

- Color palette support via `palette` prop
- CSS modules with Tailwind integration
- Responsive design with mobile/desktop variants
- Comprehensive test suite (38+ tests passing)
- Modular CSS exports (`@enotion/components/index.css`)

---

### [`@enotion/notify`](./packages/@enotion/notify) `v0.1.0`

React notification system for alerts and messages.

**API:**

- `NotificationProvider` - Context provider component
- `useNotify()` - Hook for triggering notifications

**Features:**

- Notification types: success, error, info, warning, loading
- Customizable duration and styles
- Dismissible notifications with animations
- Position control and stacking
- Icon support with custom rendering

---

### [`@enotion/server`](./packages/@enotion/server) `v0.0.0`

Server-side utilities for Node.js applications.

**Modules:**

- **System**: `getSystemSnapshot()`, CPU/memory/OS/performance/disk utilities
- **Network**: `getLocalIps()`, `getHostname()`, `isPortAvailable()`, `findAvailablePort()`
- **Process**: `execAsync()` for async shell commands

**Features:**

- Modular exports: `@enotion/server`, `@enotion/server/system`, `@enotion/server/network`
- Helper utilities: `bytesToGB()` for data conversion
- TypeScript-first with full type definitions
- Zero runtime dependencies

---

### [`@enotion/config`](./packages/@enotion/config) `v1.0.0` (private)

Shared configuration files for the monorepo.

**Configurations:**

- **TypeScript**: `base.json`, `nextjs.json`, `react-library.json`
- **Jest**: `jest.config.cjs` with React Testing Library setup
- **tsup**: `tsup.config.ts`, `tsup.entry.config.ts` for ESM bundling with Terser

**Features:**

- Centralized configuration management
- ESNext library targets
- `.mts` file generation for ESM compatibility
- Shared dev dependencies across workspace

---
