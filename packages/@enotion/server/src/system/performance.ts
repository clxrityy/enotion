import { uptime, loadavg } from "node:os";

function mapValuesIntoAverage(avgs: string[]): string {
  const total = avgs.reduce((acc, val) => acc + Number.parseFloat(val), 0);
  return (total / avgs.length).toFixed(2);
}

/**
 * Get system performance information.
 * @returns An object containing system uptime and load averages.
 */
export function performance(): { uptime: string; loadAverage: string } {
  const uptimeSeconds = uptime();
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;
  const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

  const loadAverage = loadavg().map((avg) => avg.toFixed(2));

  return {
    uptime: formattedUptime,
    loadAverage: mapValuesIntoAverage(loadAverage),
  };
}
