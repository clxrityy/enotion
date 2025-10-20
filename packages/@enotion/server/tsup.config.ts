import defineEntryConfig from "@enotion/config/tsup/tsup.entry.config";

export default defineEntryConfig({
  index: "src/index.ts",
  "network/index": "src/network/index.ts",
  "system/index": "src/system/index.ts",
}) as any;
