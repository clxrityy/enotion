import config from "@enotion/config/tsup/tsup.config";
import { defineConfig } from "tsup";

export default defineConfig({
  ...config,
  entry: ["constants/index.ts", "utils/index.ts"],
  dts: {
    entry: ["constants/index.ts", "utils/index.ts"],
  },
  clean: true,
  outDir: "dist",
});
