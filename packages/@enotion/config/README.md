# `@enotion/config`

Private global configuration for enotion packages.

- **TypeScript** configuration (`@enotion/config/typescript`)
  - [`base.json`](./typescript/base.json) - Base configuration for all packages
  - [`react-library.json`](./typescript/react-library.json) - Configuration for React libraries
  - [`nextjs.json`](./typescript/nextjs.json) - Configuration for Next.js projects
- **tsup** configuration (`@enotion/config/tsup`)
  - [`tsup.config.ts`](./tsup/tsup.config.ts) - Base configuration for building packages with tsup
  - [`tsup.entry.config.ts`](./tsup/tsup.entry.config.ts) - Configuration for building packages with multiple entry points with tsup
- **jest** configuration (`@enotion/config/jest`)
  - [`jest.config.cjs`](./jest/jest.config.cjs) - Base configuration for testing packages with Jest
  - [`jest.server.config.cjs`](./jest/jest.server.config.cjs) - Base configuration for testing server packages with Jest
- **OTHER** configurations (`@enotion/config`)
  - [`env`](./src/env/index.ts) - Environment validation.
