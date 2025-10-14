import { version, arch, type, platform, release } from "node:os";

/**
 * Get basic system information.
 * @returns An object containing OS type, platform, architecture, and version.
 */
export function os(): {
  type: string;
  platform: string;
  architecture: string;
  version: string;
  release: string;
} {
  return {
    type: type(),
    platform: platform(),
    architecture: arch(),
    version: version(),
    release: release(),
  };
}
