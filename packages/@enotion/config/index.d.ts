// TypeScript configuration exports
declare module "@enotion/config/tsconfig/base" {
  const config: any;
  export = config;
}

declare module "@enotion/config/tsconfig/nextjs" {
  const config: any;
  export = config;
}

declare module "@enotion/config/tsconfig/react-library" {
  const config: any;
  export = config;
}

// Jest configuration export
declare module "@enotion/config/jest/jest.config" {
  import type { Config } from 'jest';
  const config: Config;
  export = config;
  export default config;
}

// Tsup configuration exports
declare module "@enotion/config/tsup/tsup.config" {
  import type { Options } from 'tsup';
  const config: Options[];
  export default config;
}

declare module "@enotion/config/tsup/tsup.entry.config" {
  import type { Options } from 'tsup';
  function defineEntryConfig(entry: Record<string, string>): Options[];
  export default defineEntryConfig;
}
