import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    terserOptions: {
      compress: {
        defaults: true,
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: true,
        braces: true,
        preserve_annotations: true,
      },
    },
    outDir: "dist",
    format: ["esm"],
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: "terser",
    tsconfig: "tsconfig.json",
    dts: {
      entry: "src/index.ts",
    },
  },
]);
