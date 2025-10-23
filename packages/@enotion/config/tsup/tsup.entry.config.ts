import { defineConfig as defineTsupConfig } from "tsup";

export default function defineConfig(entry: Record<string, string>) {
  return defineTsupConfig([
    {
      entry,
      outDir: "dist",
      format: ["esm"],
      splitting: true,
      sourcemap: true,
      clean: true,
      minify: "terser",
      tsconfig: "tsconfig.json",
      dts: true,
      outExtension({ format }) {
        return {
          js: `.js`,
        };
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
}
