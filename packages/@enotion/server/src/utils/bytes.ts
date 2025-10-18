/**
 * Convert bytes to gigabytes and format to two decimal places.
 * @param bytes - The number of bytes.
 * @returns The equivalent size in gigabytes as a string formatted to two decimal places.
 */
export function bytesToGB(bytes: number): string {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}
