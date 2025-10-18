import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names and merge Tailwind CSS classes.
 *
 * @param inputs - An array of class names or conditional class name objects.
 * @returns A single string with merged class names.
 *
 * @example
 * <div className={cn("p-4", isActive && "bg-blue-500", "text-white")} />
 *
 * @see {@link https://github.com/lukeed/clsx | clsx}
 * @see {@link https://github.com/dcastil/tailwind-merge | tailwind-merge}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
