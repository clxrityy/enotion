import config from "@enotion/config/jest/jest.config";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  displayName: "@enotion/components",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
          target: "es2022",
          module: "esnext",
          moduleResolution: "bundler",
        },
      },
    ],
  },
};

export default jestConfig;
