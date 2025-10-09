import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    outDir: "dist",
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: "terser",
    tsconfig: "tsconfig.json",
    dts: {
      entry: "src/index.ts",
    },
  },
]);
