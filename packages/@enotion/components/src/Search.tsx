import { useSearch } from "@enotion/hooks";
import { Input } from "./Input.js";
import { Card } from "./Card.js";
import { HTMLAttributes } from "react";
import { randomUUID, UUID } from "crypto";
import { ColorPaletteType } from "@enotion/core/constants";

export interface SearchProps<T> extends HTMLAttributes<HTMLDivElement> {
  data: T[];
  searchKey: keyof T | (keyof T)[];
  render: (item: T, index: number) => React.ReactNode;
  colorPalette?: ColorPaletteType;
  placeholder?: string;
}

/**
 * Search - A React component that provides a search input and displays filtered results.
 * @param data - The array of data objects to be searched.
 * @param searchKey - The key of the object to perform the search on.
 * @param render - A function that takes an item and its index, and returns a React node to render.
 * @param props - Additional props to pass to the input element.
 *
 * @description
 * The `Search` component utilizes the `useSearch` hook to provide a search input field and display a list of filtered results based on the user's query.
 * It accepts an array of data objects, a key (or keys) to search within those objects, and a render function to customize how each item is displayed.
 * The component renders an input field for user queries and a list of results wrapped in `Card` components.
 *
 * @example
 * ```tsx
 * import { Search } from '@enotion/components';
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
 *   return <Search data={data} searchKey="name" render={(item) => <div>{item.name}</div>} />;
 * };
 * ```
 */
export const Search = <T,>({
  data,
  searchKey,
  render,
  colorPalette,
  placeholder,
  ...props
}: SearchProps<T>) => {
  const { query, setQuery, filteredData } = useSearch<T>(data, searchKey);

  const dataWithId = filteredData.map((item) => ({
    ...item,
    id: (item as any).id ?? (randomUUID() as UUID),
  }));

  return (
    <div {...props}>
      <Input
        placeholder={placeholder || "Search..."}
        colorPalette={colorPalette}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {dataWithId.map((item, index) => (
        <Card key={item.id} colorPalette={colorPalette}>
          {render(item, index)}
        </Card>
      ))}
    </div>
  );
};
