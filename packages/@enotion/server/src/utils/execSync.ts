import { exec } from "node:child_process";
import { promisify } from "node:util";

/**
 * Execute a command asynchronously and return the result.
 * @param command The command to execute.
 * @returns A promise that resolves to an object containing stdout and stderr.
 */
export const execAsync = promisify(exec);
