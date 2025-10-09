import { cpuTemperature, parseCpuTemperature, parseCpuUsage } from "./cpu.js";
import { memoryUsage } from "./memory.js";
import { os } from "./os.js";
import { bytesToGB } from "../util/bytes.js";
import { performance } from "./performance.js";
import { uptime } from "./uptime.js";

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
}

/**
 * Get a snapshot of the current system information.
 * @returns An object containing CPU, memory, uptime, timestamp, and system info.
 */
export async function getSystemSnapshot(): Promise<SystemSnapshot> {
  const [cpuTemp, memUsage, sysInfo] = await Promise.all([
    cpuTemperature().then((output) => parseCpuTemperature(output)),
    memoryUsage(),
    os(),
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
  };
}
