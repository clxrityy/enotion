import type { Config } from "jest";
import config from "@enotion/config/jest/jest.config.cjs";

const jestConfig: Config = {
  ...config,
};

export default jestConfig;
