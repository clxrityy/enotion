# `@enotion/server`

A set of server-side utilities, functions, types, and APIs.

## Installation

```zsh
# npm
npm install @enotion/server
# yarn
yarn add @enotion/server
# pnpm
pnpm add @enotion/server
```

## Modules

- [System](#system)
  - [CPU](#cpu)
  - [Memory](#memory)
  - [OS](#os)
  - [Performance](#performance)
- [Network](#network)

---

### System

> A collection of utilities to retrieve system information such as CPU, memory, OS, and performance metrics.

- `getSystemSnapshot()`: A function that returns a promise resolving to a snapshot of the system's current state, including CPU, memory, OS, and performance metrics.

```ts
import { getSystemSnapshot } from "@enotion/server";

const snapshot = await getSystemSnapshot();
console.log(snapshot);
/*
{
  cpu: { usage: 12.5, temperature: 45.0 },
  memory: { total: 16, free: 8, used: 8, usedGB: 8 , freeGB: 8, usage: 50 },
  uptime: '2h 30m 15s',
  timestamp: 1697059200000,
  info: {
    version: '20.04',
    type: 'Linux',
    platform: 'ubuntu',
    release: '5.4.0-42-generic',
    arch: 'x64',
  },
  performance: {
    uptime: "2h 30m 15s",
    loadAverage: "0.6",
  }
*/
```

---

#### CPU

- `cpuUsage()`: An array of numbers representing the CPU usage percentage for each core.
- `cpuTemperature()`: An array of numbers representing the temperature of each CPU core in Celsius.
- `parseCpuUsage()`: A function that returns a promise resolving to the overall CPU usage percentage.
- `parseCpuTemperature()`: A function that takes the array of CPU temperatures and returns the first valid temperature or `N\A` if none found.

```ts
import {
  cpuUsage,
  cpuTemperature,
  parseCpuUsage,
  parseCpuTemperature,
} from "@enotion/server";

const usage = cpuUsage(); // e.g., [12.5, 15.3, 10.8, 20.1]
const temperature = cpuTemperature(); // e.g., [45.0, 47.5, 44.0, 46.0]
const overallUsage = await parseCpuUsage(); // e.g., 14.7
const firstValidTemp = parseCpuTemperature(temperature); // e.g., 45.0
```

---

#### Memory

- `memoryUsage()`: A function that returns a promise resolving to an object containing memory usage statistics, including total, free, used memory in GB, and usage percentage.

```ts
import { memoryUsage } from "@enotion/server";

const memUsage = memoryUsage();
console.log(memUsage);
/*
{
  total: 16, // in GB
  free: 8,   // in GB
  used: 8,   // in GB
  usage: 50, // in percentage
}
*/
```

---

#### OS

- `os()`: A function that returns an object containing OS type, platform, architecture, and version.

```ts
import { os } from "@enotion/server";

const systemInfo = os();
console.log(systemInfo);
/*
{
  type: 'Linux',
  platform: 'ubuntu',
  architecture: 'x64',
  version: '20.04',
  release: '5.4.0-42-generic',
}
*/
```

---

#### Performance

- `performance()`: A function that returns an object containing system performance metrics such as uptime and load average.

```ts
import { performance } from "@enotion/server";

const perfMetrics = performance();
console.log(perfMetrics);
/*
{
  uptime: '2h 30m 15s',
  loadAverage: '0.6',
}
*/
```

---

### Network

> A collection of utilities to retrieve network information such as IP addresses and network interfaces.

- `getLocalIps()`: A function that returns an array of local IP addresses.

```ts
import { getLocalIps } from "@enotion/server";

const localIps = getLocalIps();
console.log(localIps);
/*
[
  "192.168.1.2",
  "10.0.0.5",
  "172.16.0.3"
]
*/
```

- `getHostname()`: A function that returns the system's hostname as a string.

```ts
import { getHostname } from "@enotion/server";

const hostname = getHostname();
console.log(hostname); // e.g., "my-computer"
```

- `isPortOpen(port: number, host?: string)`: A function that checks if a specific port is open on the given host (defaults to localhost). Returns a promise resolving to a boolean.

```ts
import { isPortOpen } from "@enotion/server";

const portStatus = await isPortOpen(8080);
console.log(portStatus); // true or false
```

- `findAvailablePort(startPort: number, endPort: number)`: A function that finds an available port within the specified range. Returns a promise resolving to the available port number or `null` if none found.

```ts
import { findAvailablePort } from "@enotion/server";

const availablePort = await findAvailablePort(8000, 8100);
console.log(availablePort); // e.g., 8001 or null
```
