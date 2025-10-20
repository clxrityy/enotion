import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
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
    outExtension({ format }) {
      return {
        js: `.js`,
        dts: `.d.ts`
      }
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
  },
]);
