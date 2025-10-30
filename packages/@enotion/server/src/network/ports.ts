import { Socket } from "node:net";

/**
 * Check if a port is open on the specified host.
 * @param port - The port number to check.
 * @param host - The host address to check (default is "127.0.0.1").
 * @returns A promise that resolves to true if the port is open, false otherwise.
 */
export async function isPortOpen(
  port: number,
  host: string = "127.0.0.1",
): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new Socket();
    const onError = () => {
      socket.destroy();
      resolve(false);
    };

    socket.setTimeout(1000);
    socket.once("error", onError);
    socket.once("timeout", onError);

    socket.connect(port, host, () => {
      socket.end();
      resolve(true);
    });
  });
}

/**
 * Find an available port within a specified range.
 * @param start - The starting port number (default is 3000).
 * @param end - The ending port number (default is 4000).
 * @returns A promise that resolves to the first available port number, or null if none are available.
 */
export async function findOpenPort(
  start: number = 3000,
  end: number = 4000,
): Promise<number | null> {
  for (let port = start; port <= end; port++) {
    const isOpen = await isPortOpen(port);
    if (!isOpen) {
      return port;
    }
  }
  return null;
}
