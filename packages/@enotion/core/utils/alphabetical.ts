/**
 * Orders an array of items alphabetically based on their `name` property.
 * @param items - The array of items to be ordered.
 * @returns A new array of items ordered alphabetically by name.
 */
export function orderAlphabetically<T extends { name: string }>(items: T[]): T[] {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}
