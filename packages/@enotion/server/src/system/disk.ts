// Disk information utilities
import { execAsync } from "../util/index.js";

/** Disk usage information interface */
export interface DiskInfo {
  filesystem: string;
  size: string;
  used: number;
  free: number;
  usagePercent: number;
  available: number;
  usePercent: string;
  mountedOn: string;
}

/** Get disk usage information.
 * @param path The filesystem path to check (default is root '/')
 * @returns {Promise<DiskInfo>} A promise that resolves to disk usage information.
 *
 * @example
 * const diskInfo = await diskUsage('/');
 * console.log(diskInfo);
 */
export async function diskUsage(path = "/"): Promise<DiskInfo> {
  const platform = process.platform;
  let cmd = "";

  // Use POSIX format (-P) with 1K blocks (-k) to align columns across Linux and macOS
  if (platform === "linux" || platform === "darwin") {
    cmd = `df -P -k "${path}" | tail -1`;
  } else {
    throw new Error("Unsupported platform");
  }

  const { stdout } = await execAsync(cmd);
  // POSIX df -P columns: Filesystem 1024-blocks Used Available Capacity Mounted on
  // Split line but keep potential spaces in mount point by joining tail tokens
  const tokens = stdout.trim().split(/\s+/);
  if (tokens.length < 6) {
    throw new Error("Unexpected df output format");
  }

  let usagePercent = 0;
  let used = 0;
  let free = 0;
  let available = 0;
  let filesystem = "";
  let size = "";
  let usePercent = "";
  let mountedOn = "";

  // Parse using the POSIX layout
  filesystem = tokens[0] || "";
  size = tokens[1] || ""; // in 1K blocks, keep as string for display consistency
  used = Number.parseInt(tokens[2] ?? "0", 10) * 1024; // bytes
  available = Number.parseInt(tokens[3] ?? "0", 10) * 1024; // bytes
  free = available; // Treat Avail as Free
  usePercent = tokens[4] || ""; // e.g., "60%"
  usagePercent = Number.parseFloat(usePercent.replace("%", ""));
  mountedOn = tokens.slice(5).join(" "); // join rest to support spaces in mountpoint

  return {
    filesystem,
    size,
    used,
    free,
    usagePercent,
    available,
    usePercent,
    mountedOn,
  };

  // Note: Sizes are in bytes, usagePercent is a number (e.g., 75.5 for 75.5%)
  // Free and Available are treated the same here for simplicity
  // Adjust as needed based on specific requirements
  // For windows support, a different approach would be needed
  // as 'df' is not available on Windows by default
  // Consider using 'wmic logicaldisk' or PowerShell commands
  // For example:
  // wmic logicaldisk get size,freespace,caption
  // or
  // Get-PSDrive -PSProvider FileSystem
}
