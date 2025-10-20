import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["constants/index.ts", "utils/index.ts", "index.ts"],
  outDir: "dist",
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: "terser",
  tsconfig: "tsconfig.json",
  outExtension({ format }) {
    return {
      js: `.js`,
      dts: `.d.ts`
    }
  },
  dts: {
    entry: ["constants/index.ts", "utils/index.ts", "index.ts"],
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
});
