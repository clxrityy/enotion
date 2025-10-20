---
applyTo: "**"
description: Instructions & guidelines for working with the workspace in this repository.
---

# Command usage

This workspace uses `pnpm` as its package manager. Below are some commonly used commands for managing the workspace:

- `pnpm build`: Builds all packages & apps in the workspace.
- `pnpm dev`: Starts the development server for all apps in the workspace.
- `pnpm test`: Runs tests for all packages in the workspace.
- `pnpm lint`: Lints all packages & apps in the workspace.

## Filtering by package/app

`pnpm build --filter web` - Builds only the `web` app.
`pnpm test --filter @enotion/hooks` - Runs tests only for the `@enotion/hooks` package.

---

# Workspace Structure

The workspace is organized into two main directories: `packages/` and `apps/`.

```
/packages/
   |-- @enotion/
       |-- ... (various packages)
/apps/
   |-- web/
        |-- ... (web application)
```

---

# Goals

## Effective Workspace Management

- Maintain a turborepo structure for the workspace to enable efficient builds and dependency management.
- Ensure consistent code quality and style across all packages and applications.
- Facilitate easy testing and deployment processes within the workspace.
- Promote reusability of code through modular package design.

## Purpose

The goal is to create a web application that leverages the modular packages in the `packages/` directory, ensuring a seamless development experience and efficient build processes.
This will also provide an open-source foundation for future projects, allowing for easy integration and extension of the existing packages.
The application will serve as a showcase of the capabilities of the packages and modularity of documentating them effectively.
