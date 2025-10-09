/** Extract idle percentage from a `top` output line across platforms.
 * Returns idle percent if found, otherwise null.
 */
export function parseIdleFromTopOutput(out: string): number | null {
    const text = out.trim();
    // Linux example: "Cpu(s):  12.3%us, ... 87.7%id, ..."
    const linux = text.match(/(\d+(?:\.\d+)?)\s*id/i);
    if (linux && linux[1]) return Number.parseFloat(linux[1]);
    // macOS example: "CPU usage: 7.59% user, 6.45% sys, 85.94% idle"
    const darwin = text.match(/(\d+(?:\.\d+)?)%\s*idle/i);
    if (darwin && darwin[1]) return Number.parseFloat(darwin[1]);
    return null;
}
