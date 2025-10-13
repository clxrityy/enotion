import type { Config } from "jest";

const jestConfig: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          module: "ES2022",
          target: "ES2022",
          moduleResolution: "node",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default jestConfig;
