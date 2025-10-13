import "./jest.config.cjs";

// This file is needed to provide TypeScript types for the Jest configuration
// when the configuration is imported in TypeScript projects.

// It re-exports the types from the main Jest configuration file.

import type { Config } from "jest";

// Type assertion to bypass the error temporarily
const config = require("./jest.config.cjs") as Config;

export default config;
