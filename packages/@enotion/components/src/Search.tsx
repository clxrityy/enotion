import { useSearch } from "@enotion/hooks";
import { Input } from "./Input.js";
import { Card } from "./Card.js";
import { HTMLAttributes } from "react";
import { ColorPaletteType } from "@enotion/core/constants";

export interface SearchProps<T> extends HTMLAttributes<HTMLDivElement> {
  data: T[];
  searchKey: keyof T | (keyof T)[];
  render: (item: T, index: number) => React.ReactNode;
  palette?: ColorPaletteType;
  placeholder?: string;
  showItemsWhenQueryEmpty?: boolean;
}

/**
 * Search - A React component that provides a search input and displays filtered results.
 * @param data - The array of data objects to be searched.
 * @param searchKey - The key of the object to perform the search on.
 * @param render - A function that takes an item and its index, and returns a React node to render.
 * @param palette - Optional color palette for styling the component.
 * @param placeholder - Optional placeholder text for the search input.
 * @param showItemsWhenQueryEmpty - Whether to show all items when the search query is empty (default: true).
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
  palette,
  placeholder,
  showItemsWhenQueryEmpty = true,
  ...props
}: SearchProps<T>) => {
  const { query, setQuery, filteredData } = useSearch<T>(data, searchKey);

  return (
    <div {...props}>
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        palette={palette}
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
      {(showItemsWhenQueryEmpty || query) &&
        filteredData.map((item, index) => {
          // Create a unique key from the item content
          const itemKey = `search-item-${JSON.stringify(item)}-${index}`;
          return (
            <Card key={itemKey} palette={palette}>
              {render(item, index)}
            </Card>
          );
        })}
    </div>
  );
};
