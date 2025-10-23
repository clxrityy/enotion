import config from "@enotion/config/jest/jest.config";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  displayName: "@enotion/notify",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};

export default jestConfig;
