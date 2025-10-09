import { defineConfig as defineTsupConfig } from "tsup";

export default function defineConfig(entry: Record<string, string>) {
  return defineTsupConfig([
    {
      entry,
      terserOptions: {
        compress: {
          defaults: true,
        }
      },
      outDir: "dist",
      format: ["esm"],
      clean: true,
      minify: "terser",
      tsconfig: "tsconfig.json",
      dts: {
        entry,
      },
    },
  ]);
}
