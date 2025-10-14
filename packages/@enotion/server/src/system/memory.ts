import { totalmem, freemem } from "node:os";

/**
 * Get memory usage information.
 * @returns An object containing total, free, used memory in GB and usage percentage.
 */
export function memoryUsage(): {
  total: string;
  free: string;
  used: string;
  usage: string;
} {
  const total = totalmem();
  const free = freemem();
  const used = total - free;
  const usage = (100 * used) / total;

  return {
    total: (total / (1024 * 1024 * 1024)).toFixed(2),
    free: (free / (1024 * 1024 * 1024)).toFixed(2),
    used: (used / (1024 * 1024 * 1024)).toFixed(2),
    usage: usage.toFixed(1),
  };
}
