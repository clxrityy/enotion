const config = require("@enotion/config/jest/jest.config.cjs");
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};

export default jestConfig;
