import config from "@enotion/config/jest/jest.server.config.cjs";
import type { Config } from "jest";

const jestConfig: Config = {
  ...config,
};

export default jestConfig;
