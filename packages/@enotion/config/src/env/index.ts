export type NodeEnvironment = "development" | "production" | "test";

export interface EnvironmentVariables {
  NODE_ENV: NodeEnvironment;
}

export class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvironmentError";
  }
}

export function validateEnvironmentVariable(
  name: string,
  value: string | undefined,
): string {
  if (!value || value.trim() === "") {
    throw new EnvironmentError(
      `Environment variable ${name} is not set or is empty.`,
    );
  }

  return value;
}

export function validateNodeEnvironment(
  value: string | undefined,
): NodeEnvironment {
  const validEnvironments: NodeEnvironment[] = [
    "development",
    "production",
    "test",
  ] as const;

  if (!value || !validEnvironments.includes(value as NodeEnvironment)) {
    return "development"; // Default to development if invalid
  }

  return value as NodeEnvironment;
}

export function validateEnvironment(): EnvironmentVariables {
  try {
    return {
      NODE_ENV: validateNodeEnvironment(process.env.NODE_ENV),
    };
  } catch (error) {
    if (error instanceof EnvironmentError) {
      throw error;
    }
    throw new EnvironmentError(
      "An unknown error occurred during environment validation.",
    );
  }
}
