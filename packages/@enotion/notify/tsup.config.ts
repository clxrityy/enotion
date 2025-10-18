import config from "@enotion/config/tsup/tsup.config";
import { defineConfig } from "tsup";

export default defineConfig([
  {
    ...config,
    entry: ["src/index.ts"],
    dts: {
      entry: "src/index.ts",
    },
  },
]);
