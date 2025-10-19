import config from "@enotion/config/jest/jest.config";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};

export default jestConfig;
