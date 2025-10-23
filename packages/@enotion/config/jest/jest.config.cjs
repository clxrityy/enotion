"use strict";
/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  globals: {
    jest: true,
  },
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
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@enotion/core$": "<rootDir>/../core/index.ts",
    "^@enotion/core/constants$": "<rootDir>/../core/constants/index.ts",
    "^@enotion/core/utils$": "<rootDir>/../core/utils/index.ts",
    "^@enotion/core/(.*)$": "<rootDir>/../core/$1",
    "^@enotion/core/index\\.css$": "identity-obj-proxy",
    "^@enotion/notify/index\\.css$": "identity-obj-proxy",
    "^@enotion/(.*)$": "<rootDir>/../$1/src",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  testMatch: [
    "**/__tests__/**/*.(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)",
    "**/tests/**/*.(ts|tsx)",
  ],
  transformIgnorePatterns: ["node_modules/(?!(@enotion)/)"],
  setupFilesAfterEnv: [],
};
