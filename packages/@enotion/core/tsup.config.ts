import defineEntryConfig from "@enotion/config/tsup/tsup.entry.config";

export default defineEntryConfig({
  index: "index.ts",
  "constants/index": "constants/index.ts",
  "utils/index": "utils/index.ts",
  "contexts/index": "contexts/index.ts",
  "lib/index": "lib/index.ts",
}) as any;
