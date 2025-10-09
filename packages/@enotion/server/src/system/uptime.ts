export function uptime() {
  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;


  const parseTime = (seconds: number) => {
    return seconds.toString().padStart(2, '0');
  }

  return `${parseTime(hours)}h ${parseTime(minutes)}m ${parseTime(seconds)}s`;
}
