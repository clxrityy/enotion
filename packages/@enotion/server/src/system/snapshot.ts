import { cpuTemperature, parseCpuTemperature, parseCpuUsage } from "./cpu.js";
import { memoryUsage } from "./memory.js";
import { os } from "./os.js";
import { bytesToGB } from "../util/bytes.js";
import { performance } from "./performance.js";
import { uptime } from "./uptime.js";
import { diskUsage, type DiskInfo } from "./disk.js";

/**
 * Interface representing a snapshot of the system's current state.
 */
export interface SystemSnapshot {
  cpu: {
    usage: number;
    temperature?: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usedGB: number;
    freeGB: number;
    usage: number;
  };
  uptime: string;
  timestamp: number;
  os: {
    model?: string;
    version?: string;
    type?: string;
    platform?: string;
    release?: string;
    arch?: string;
  };
  performance?: { uptime: string; loadAverage: string };
  disk?: DiskInfo;
}

/**
 * Get a snapshot of the current system information.
 * @param path The filesystem path to check disk usage (default is root '/')
 * @returns An object containing CPU, memory, uptime, timestamp, OS info, and disk usage.
 *
 * @example
 * const snapshot = await getSystemSnapshot();
 * console.log(snapshot);
 */
export async function getSystemSnapshot(path = "/"): Promise<SystemSnapshot> {
  const [cpuTemp, memUsage, sysInfo, diskInfo] = await Promise.all([
    cpuTemperature().then((output) => parseCpuTemperature(output)),
    memoryUsage(),
    os(),
    // Make disk usage resilient: if it fails, return undefined so snapshot still works
    diskUsage(path).catch(() => undefined as unknown as DiskInfo),
  ]);

  const parsedCpuUsage = await parseCpuUsage();

  return {
    cpu: {
      usage: parseFloat(parsedCpuUsage),
      temperature: parseFloat(cpuTemp),
    },
    memory: {
      total: parseFloat(memUsage.total),
      used: parseFloat(memUsage.used),
      free: parseFloat(memUsage.free),
      usedGB: parseFloat(bytesToGB(parseFloat(memUsage.used))),
      freeGB: parseFloat(bytesToGB(parseFloat(memUsage.free))),
      usage: (parseFloat(memUsage.used) / parseFloat(memUsage.total)) * 100,
    },
    uptime: uptime(),
    timestamp: Date.now(),
    os: {
      version: sysInfo.version,
      type: sysInfo.type,
      platform: sysInfo.platform,
      release: sysInfo.release,
      arch: sysInfo.architecture,
    },
    performance: performance(),
    disk: diskInfo,
  };
}
