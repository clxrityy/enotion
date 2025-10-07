# `@enotion/hooks`

## Installation

```bash
# npm
npm install @enotion/hooks
# yarn
yarn add @enotion/hooks
# pnpm
pnpm add @enotion/hooks
```

## Hooks

- [`crateContextFactory()`](#usecontextfactory)
- [`useFetch()`](#usefetch)
- [`usePreload()`](#usepreload)
- [`useLocalStorage()`](#uselocalstorage)
- [`useEventListener()`](#useeventlistener)
- [`useTheme()`](#usetheme)
- [`useScript()`](#usescript)

### `createContextFactory()`

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

### `useLocalStorage()`

A React hook that synchronizes a state variable with localStorage, allowing you to persist state across page reloads.

```tsx
"use client";
import { useLocalStorage } from "@enotion/hooks";

const Component = () => {
  const [value, setValue, removeValue, error] = useLocalStorage(
    "myKey",
    "initialValue"
  );

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue("newValue")}>Set Value</button>
      <button onClick={removeValue}>Remove Value</button>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
```

### `useEventListener()`

A React hook that adds an event listener to a specified target (default is `window`) and cleans up the listener on unmount.

```tsx
"use client";
import { useEventListener } from "@enotion/hooks";

const Component = () => {
  const handleResize = (event: Event) => {
    console.log("Window resized:", event);
  };

  useEventListener("resize", handleResize);

  return <div>Resize the window and check the console</div>;
};
```

### `useTheme()`

A React hook that manages theme state (system/light/dark) and persists the preference in localStorage.

```tsx
// Provider.tsx
"use client";
import { ThemeProvider } from "@enotion/hooks";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
```

```tsx
// layout.tsx
import { Provider } from "./Provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
```

```tsx
// Component.tsx
"use client";
import { useTheme } from "@enotion/hooks";

export const Component = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div>Current Theme: {theme}</div>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setTheme("system")}>System Mode</button>
    </div>
  );
};
```

### `useScript()`

A React hook that dynamically loads an external script and provides loading and error states.

```tsx
"use client";
import { useScript } from "@enotion/hooks";

const Component = () => {
  const onLoad = () => {
    console.log("Script loaded successfully");
  };

  const onError = () => {
    console.log("Error loading script");
  };

  const loaded = useScript("https://example.com/some-script.js", {
    onLoad, // optional callback when script loads
    onError, // optional callback when script fails to load
  });

  return <div>Script loaded: {loaded ? "Yes" : "No"}</div>;
};
```
