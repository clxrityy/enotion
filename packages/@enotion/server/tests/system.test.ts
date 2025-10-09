import { describe, it, expect, jest } from "@jest/globals";

describe("System Module", () => {
  it("should retrieve a valid system snapshot", async () => {
    // Mock CPU module to avoid shell commands (vcgencmd/top) in CI/JS DOM
    jest.unstable_mockModule("../src/system/cpu", () => ({
      cpuTemperature: async () => ["45.0"],
      parseCpuUsage: async () => "12.3",
      // Keep same behavior as implementation for parseCpuTemperature
      parseCpuTemperature: (out: string[]) =>
        out.length ? Number.parseFloat(out[0]).toFixed(1) : "N/A",
    }));

    const { getSystemSnapshot } = await import("../src/system");
    const snapshot = await getSystemSnapshot();
    expect(snapshot).toBeDefined();
    expect(typeof snapshot.cpu.usage).toBe("number");
    expect(typeof snapshot.memory.total).toBe("number");
    expect(snapshot.os).toBeDefined();
  });

  it("should handle CPU temperature parsing correctly", async () => {
    const { parseCpuTemperature } = await import("../src/system/cpu");
    expect(parseCpuTemperature(["50.5"])).toBe("50.5");
    expect(parseCpuTemperature([])).toBe("N/A");
  });

  it("should handle CPU usage parsing correctly", async () => {
    const { parseCpuUsage } = await import("../src/system/cpu");
    // Mock execAsync to return a controlled output
    jest.unstable_mockModule("../src/util/index", () => ({
      execAsync: async () => ({
        stdout:
          "Cpu(s):  12.3%us,  0.0%sy,  0.0%ni, 87.7%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st\n",
      }),
    }));
    const usage = await parseCpuUsage();
    expect(usage).toBe("12.3");
  });

  it("should retrieve performance metrics", async () => {
    const { performance } = await import("../src/system/performance");
    const perf = performance();
    expect(perf).toBeDefined();
    expect(typeof perf.uptime).toBe("string");
    expect(typeof perf.loadAverage).toBe("string");
  });
});
