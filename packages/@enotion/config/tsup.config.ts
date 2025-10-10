import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["constants/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist",
  outExtension() {
    return {
      js: ".js",
      dts: ".d.ts",
    };
  },
});
