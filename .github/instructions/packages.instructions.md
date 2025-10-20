---
applyTo: **/packages/**
description: Instructions & guidelines for working with the packages in this repository.
---

# Working with Packages

This directory contains various packages that are part of this repository. Each package is designed to be modular and reusable across different projects.

## Structure

Each package is located in its own subdirectory within the `packages/@enotion/` directory. The structure typically looks like this:

```
packages/@enotion/
   |-- package-name/
       |-- src/
       |-- tests/
       |-- package.json
       |-- README.md
```

---

## Packages

#### `@enotion/core`

The core functionality shared across all packages.

- `@enotion/core/constants`: Contains constant values used in the core package.
- `@enotion/core/utils`: Utility functions for the core package.
- `@enotion/core/types`: Type definitions for the core package.

#### `@enotion/config`

The configurations (e.g., tsconfig, tsup, jest) used across all or various packages.

- `@enotion/config/tsconfig`: TypeScript configuration files.
- `@enotion/config/tsup`: Tsup configuration files.
- `@enotion/config/jest`: Jest configuration files.

#### `@enotion/hooks`

Reusable React hooks for various functionalities.

#### `@enotion/components`

Various reusable React components. Utilizes `@enotion/hooks` and `@enotion/core`.

#### `@enotion/server`

Server-side utilities and functionalities.

- `@enotion/server/network`: Network-related utilities.
- `@enotion/server/system`: System-related utilities.

> All exported by default through `@enotion/server`.

#### `@enotion/notify`

Notification system for React applications.

> Inspired by `react-hot-toast`

---
