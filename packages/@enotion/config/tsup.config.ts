import config from "./tsup/tsup.config";
import { defineConfig } from "tsup";

export default defineConfig({
  ...config,
  entry: ["src/index.ts"],
  dts: true,
});
