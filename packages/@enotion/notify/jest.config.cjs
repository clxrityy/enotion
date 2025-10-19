/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{ts,tsx}"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/styleMock.cjs",
    "^@enotion/core$": "<rootDir>/../core/index.ts",
    "^@enotion/core/(.+)$": "<rootDir>/../core/$1",
    "^@enotion/(.+)$": "<rootDir>/../$1/src/index.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
};
