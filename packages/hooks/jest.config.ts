import config from "@enotion/config/jest/jest.config.cjs";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
};

export default jestConfig;
