import config from "@enotion/config/jest/jest.config";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  displayName: "@enotion/hooks",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{ts,tsx}"],
};

export default jestConfig;
