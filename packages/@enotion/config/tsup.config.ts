import config from "./tsup/tsup.config";
import { defineConfig } from "tsup";

export default defineConfig({
  ...config,
  entry: ["constants/index.ts"],
  dts: true,
  outExtension() {
    return {
      js: ".js",
      dts: ".d.ts",
    };
  },
});
