import config from "@enotion/config/jest/jest.config";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  displayName: "@enotion/core",
  rootDir: ".",
  testMatch: [
    "<rootDir>/tests/**/*.{test,spec}.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@enotion/(.*)$": "<rootDir>/../$1/src",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@enotion)/)"
  ],
};

export default jestConfig;
