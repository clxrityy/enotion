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

    // Mock disk module to avoid df command variations
    jest.unstable_mockModule("../src/system/disk", () => ({
      diskUsage: async () => ({
        filesystem: "/dev/disk1s1",
        size: "100000000",
        used: 60000000000,
        free: 40000000000,
        usagePercent: 60,
        available: 40000000000,
        usePercent: "60%",
        mountedOn: "/",
      }),
    }));

    const getSystemSnapshot = (await import("../src/system")).default;
    const snapshot = await getSystemSnapshot();
    expect(snapshot).toBeDefined();
    expect(typeof snapshot.cpu.usage).toBe("number");
    expect(typeof snapshot.memory.total).toBe("number");
    expect(snapshot.os).toBeDefined();
    expect(snapshot.disk).toBeDefined();
    // Clean up ESM module registry for subsequent tests that rely on fresh mocks
    jest.resetModules();
  });

  it("should handle CPU temperature parsing correctly", async () => {
    const { parseCpuTemperature } = await import("../src/system/cpu");
    expect(parseCpuTemperature(["50.5"])).toBe("50.5");
    expect(parseCpuTemperature([])).toBe("N/A");
  });

  it("should handle CPU usage parsing correctly", async () => {
    // Ensure clean module state and mock execAsync before importing the module under test
    jest.resetModules();
    jest.unstable_mockModule("../src/util/index.js", () => ({
      execAsync: async () => ({
        stdout:
          "Cpu(s):  12.3%us,  0.0%sy,  0.0%ni, 87.7%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st\n",
      }),
    }));
    let usage: string = "";
    await jest.isolateModulesAsync(async () => {
      const { parseCpuUsage } = await import("../src/system/cpu");
      usage = await parseCpuUsage();
    });
    expect(usage).toBe("12.3");
  });

  it("should parse macOS top output format", async () => {
    const { parseIdleFromTopOutput } = await import("../src/util/parsers");
    const idle = parseIdleFromTopOutput(
      "CPU usage: 7.59% user, 6.45% sys, 85.96% idle\n",
    );
    expect(idle).toBeCloseTo(85.96, 2);
  });

  it("should retrieve performance metrics", async () => {
    const { performance } = await import("../src/system/performance");
    const perf = performance();
    expect(perf).toBeDefined();
    expect(typeof perf.uptime).toBe("string");
    expect(typeof perf.loadAverage).toBe("string");
  });

  it("should retrieve disk usage information", async () => {
    const { diskUsage } = await import("../src/system/disk");
    const diskInfo = await diskUsage("/");
    expect(diskInfo).toBeDefined();
    expect(typeof diskInfo.filesystem).toBe("string");
    expect(typeof diskInfo.size).toBe("string");
    expect(typeof diskInfo.used).toBe("number");
    expect(typeof diskInfo.free).toBe("number");
    expect(typeof diskInfo.usagePercent).toBe("number");
    expect(typeof diskInfo.available).toBe("number");
    expect(typeof diskInfo.usePercent).toBe("string");
    expect(typeof diskInfo.mountedOn).toBe("string");
  });
});
