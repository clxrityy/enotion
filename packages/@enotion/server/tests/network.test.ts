import {
  getHostname,
  getLocalIps,
  findOpenPort,
  isPortOpen,
} from "../src/network";
import { describe, it, expect } from "@jest/globals";

describe("Network Module", () => {
  it("should retrieve local IP addresses", () => {
    const ips = getLocalIps();
    expect(Array.isArray(ips)).toBe(true);
    for (const ip of ips) {
      expect(typeof ip).toBe("string");
      expect(ip.length).toBeGreaterThan(0);
    }
  });

  it("should retrieve the hostname", () => {
    const name = getHostname();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("should check if a port is open", async () => {
    const openPort = 80; // Commonly open port (HTTP)
    const closedPort = 65000; // Likely closed port

    const isOpen = await isPortOpen(openPort);
    expect(typeof isOpen).toBe("boolean");

    const isClosed = await isPortOpen(closedPort);
    expect(typeof isClosed).toBe("boolean");
  });

  it("should find an available port", async () => {
    const port = await findOpenPort(3000, 3010);
    expect(
      port === null ||
        (typeof port === "number" && port >= 3000 && port <= 3010),
    ).toBe(true);
  });
});
