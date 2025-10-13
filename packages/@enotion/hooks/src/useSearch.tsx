import { useState } from "react";

/**
 * A custom React hook that provides search functionality over a dataset.
 *
 * @param {T[]} data - The array of data objects to be searched.
 * @param {keyof T} searchKey - The key of the object to perform the search on.
 *
 * @return An object containing the current search query, a function to update the query, and the filtered data array.
 *
 * @example
 * ```tsx
 * "use client";
 * import { useSearch } from '@enotion/hooks';
 *
 * interface Item {
 *   id: number;
 *   name: string;
 * }
 *
 * const MyComponent = () => {
 *   const data: Item[] = [
 *     { id: 1, name: 'Apple' },
 *     { id: 2, name: 'Banana' },
 *     { id: 3, name: 'Orange' },
 *   ];
 *
 *   const { query, setQuery, filteredData } = useSearch<Item>(data, 'name');
 *
 *   return (
 *     <div>
 *       <input
 *         type="text"
 *         value={query}
 *         onChange={(e) => setQuery(e.target.value)}
 *         placeholder="Search..."
 *       />
 *       <ul>
 *         {filteredData.map(item => (
 *           <li key={item.id}>{item.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * };
 * ```
 */
export const useSearch = <T,>(data: T[], searchKey: keyof T | (keyof T)[]) => {
  const [query, setQuery] = useState<string>("");

  const filteredData = data.filter((item) => {
    if (Array.isArray(searchKey)) {
      return searchKey.some((key) =>
        String(item[key]).toLowerCase().includes(query.toLowerCase()),
      );
    }
    return String(item[searchKey]).toLowerCase().includes(query.toLowerCase());
  });

  return { query, setQuery, filteredData };
}
