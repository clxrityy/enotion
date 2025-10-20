import defineEntryConfig from "@enotion/config/tsup/tsup.entry.config";

export default defineEntryConfig({
  index: "index.ts",
  "constants/index": "constants/index.ts",
  "utils/index": "utils/index.ts",
}) as any;
