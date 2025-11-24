// Disk information utilities
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";

const execFileAsync = promisify(execFile);

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

/**
 * Validates a filesystem path to prevent command injection.
 * @param path The path to validate
 * @returns The validated and resolved absolute path
 * @throws Error if path is invalid
 */
function validatePath(path: string): string {
  // Reject paths containing null bytes (could be used for injection)
  if (path.includes("\0")) {
    throw new Error("Invalid path: contains null bytes");
  }
  // Resolve to absolute path to normalize
  const resolved = resolve(path);
  // Also check the resolved path for null bytes (defensive)
  if (resolved.includes("\0")) {
    throw new Error("Invalid path: contains null bytes");
  }
  return resolved;
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

  // Validate and sanitize the path to prevent command injection
  const safePath = validatePath(path);

  // Use POSIX format (-P) with 1K blocks (-k) to align columns across Linux and macOS
  if (platform !== "linux" && platform !== "darwin") {
    throw new Error("Unsupported platform");
  }

  // Use execFile instead of exec to avoid shell injection vulnerabilities
  const { stdout } = await execFileAsync("df", ["-P", "-k", safePath]);

  // POSIX df -P columns: Filesystem 1024-blocks Used Available Capacity Mounted on
  // The output includes a header line, so we need to skip it and use the last data line
  const lines = stdout.trim().split("\n");
  if (lines.length < 2) {
    throw new Error("Unexpected df output format");
  }
  // Get the last line (data line, skip header)
  const dataLine = lines[lines.length - 1];
  if (!dataLine) {
    throw new Error("Unexpected df output format");
  }
  // Split line but keep potential spaces in mount point by joining tail tokens
  const tokens = dataLine.trim().split(/\s+/);
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
