import { cpus } from "node:os";
import { execAsync, parseIdleFromTopOutput } from "../utils/index.js";

/**
 * Get CPU usage information.
 * @returns An array of CPU usage percentages for each core.
 */
export function cpuUsage(): string[] {
  const usage = cpus();
  return usage.map((cpu) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = 100 - (100 * cpu.times.idle) / total;
    return usage.toFixed(1);
  });
}

/** Get CPU temperature information.
 * @returns A promise that resolves to an array of CPU temperatures in Celsius.
 */
export async function cpuTemperature(): Promise<string[]> {
  try {
    const { stdout } = await execAsync("vcgencmd measure_temp");
    return Number.parseFloat(stdout.replace("temp=", "").replace("'C\n", ""))
      .toFixed(1)
      .split("\n");
  } catch {
    // vcgencmd not available (not Raspberry Pi) - return placeholder
    return ["N/A"];
  }
}

/** Get overall CPU usage percentage.
 * @returns A promise that resolves to the overall CPU usage percentage as a string.
 */
export async function parseCpuUsage(): Promise<string> {
  // Try platform-specific commands first, then fall back to sampling via os.cpus()
  const platform = process.platform;

  // Helper to parse either Linux `top` or macOS `top` output lines
  const parseIdleFromTop = (out: string): number | null =>
    parseIdleFromTopOutput(out);

  // Attempt platform command
  let cmd = "";
  if (platform === "darwin") {
    cmd = "top -l 1 -n 0 | grep 'CPU usage'";
  } else if (platform === "linux") {
    cmd = "top -bn1 | grep 'Cpu(s)'";
  }

  if (cmd) {
    try {
      const { stdout } = await execAsync(cmd);
      const idle = parseIdleFromTop(stdout);
      if (idle !== null && !Number.isNaN(idle)) {
        return (100 - idle).toFixed(1);
      }
    } catch {
      // ignore and fall through to sampling fallback
    }
  }

  // Fallback: portable sampling using os.cpus() deltas
  const sample = async (ms = 120): Promise<string> => {
    const snap = () => {
      const list = cpus();
      let idle = 0;
      let total = 0;
      for (const c of list) {
        const times = c.times;
        idle += times.idle;
        total += times.user + times.nice + times.sys + times.idle + times.irq;
      }
      return { idle, total };
    };
    const a = snap();
    await new Promise((r) => setTimeout(r, ms));
    const b = snap();
    const idleDelta = b.idle - a.idle;
    const totalDelta = b.total - a.total;
    if (totalDelta <= 0) return "0.0";
    const usage = 100 * (1 - idleDelta / totalDelta);
    return usage.toFixed(1);
  };

  return sample();
}

/** Parse CPU temperature output.
 * @param output An array of strings representing CPU temperatures.
 * @returns The first valid temperature as a string, or "N/A" if none found.
 */
export function parseCpuTemperature(output: string[]): string {
  return (
    output.reduce((acc, temp) => {
      const parsed = Number.parseFloat(temp);
      if (!Number.isNaN(parsed)) {
        acc.push(parsed.toFixed(1));
      }
      return acc;
    }, [] as string[])[0] || "N/A"
  );
}
