import config from "@enotion/config/tsup/tsup.entry.config";

export default config({
  index: "src/index.ts",
  system: "src/system/index.ts",
  network: "src/network/index.ts",
});
