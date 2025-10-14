import { networkInterfaces, hostname } from "node:os";

/**
 * Get local IP addresses.
 * @returns An array of local IPv4 addresses.
 */
export function getLocalIps(): string[] {
  const interfaces = networkInterfaces();
  const addresses: string[] = [];

  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === "IPv4" && !addr.internal) {
        addresses.push(addr.address);
      }
    }
  }

  return addresses;
}

/** Get the system hostname.
 * @returns The hostname of the system.
 */
export function getHostname(): string {
  return hostname();
}
