import { cpus } from "os";
import { execAsync } from "../util/index.js";

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
  const { stdout } = await execAsync("vcgencmd measure_temp");

  return parseFloat(stdout.replace("temp=", "").replace("'C\n", ""))
    .toFixed(1)
    .split("\n");
}

/** Get overall CPU usage percentage.
 * @returns A promise that resolves to the overall CPU usage percentage as a string.
 */
export async function parseCpuUsage(): Promise<string> {
  const { stdout } = await execAsync("top -bn1 | grep 'Cpu(s)'");
  const cpuLine = stdout.trim();
  const usageMatch = cpuLine.match(/(\d+\.\d+)\s*id/);
  if (usageMatch && usageMatch[1]) {
    const idle = parseFloat(usageMatch[1]);
    const usage = (100 - idle).toFixed(1);
    return usage;
  }
  throw new Error("Could not parse CPU usage");
}

/** Parse CPU temperature output.
 * @param output An array of strings representing CPU temperatures.
 * @returns The first valid temperature as a string, or "N/A" if none found.
 */
export function parseCpuTemperature(output: string[]): string {
  return (
    output.reduce((acc, temp) => {
      const parsed = parseFloat(temp);
      if (!isNaN(parsed)) {
        acc.push(parsed.toFixed(1));
      }
      return acc;
    }, [] as string[])[0] || "N/A"
  );
}
