# `@enotion/hooks`

## Installation

```bash
npm install @enotion/hooks
# or
yarn add @enotion/hooks
# or
pnpm add @enotion/hooks
```

## Hooks

- [`useContextFactory()`](#usecontextfactory)
- [`useFetch()`](#usefetch)
- [`usePreload()`](#usepreload)

### `useContextFactory()`

Creates a context provider and a hook to consume the context.

```tsx
"use client";
import { useContextFactory } from "@enotion/hooks";

const initialState = { value: "initial" };
const { Provider, useContext } = useContextFactory(initialState);

const Component = () => {
  const context = useContext();
  return <div>{context.value}</div>;
};

export default function Page() {
  return (
    <Provider>
      <Component />
    </Provider>
  );
}
```

### `useFetch()`

Fetches data from a given URL (and optional [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) options) and returns the response data, loading state, and error state.

```tsx
"use client";
import { useFetch } from "@enotion/hooks";

const Component = () => {
  const { data, loading, error } = useFetch("https://api.example.com/data");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

### `usePreload()`

Designed to facilitate the preloading of data or resources before they are needed in your application. This hook can be particularly useful for improving user experience by ensuring that necessary data is available when a component mounts.

```tsx
"use client";
import { usePreload } from "@enotion/hooks";

const importComponent = () => import("./MyComponent");

const Component = () => {
  const preloaded = usePreload(importComponent);

  return <div {...preloaded}>Hover to preload component</div>;
};
```
