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
- [`useVisibility()`](#usevisibility)
- [`useOutsideClick()`](#useoutsideclick)
- [`useScreenSize()`](#usescreensize)
- [`useElementSize()`](#useelementsize)
- [`useSearch()`](#usesearch)
- [`useClipboard()`](#useclipboard)

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

### `useVisibility()`

A React hook that tracks the visibility state of a DOM element using the Intersection Observer API.

```tsx
"use client";
import { useRef } from "react";
import { useVisibility } from "@enotion/hooks";

const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(ref, { threshold: 0.1 });

  return (
    <div>
      <div style={{ height: "150vh" }}>Scroll down to see the box</div>
      <div
        ref={ref}
        style={{
          height: "100px",
          backgroundColor: isVisible ? "green" : "red",
          transition: "background-color 0.3s",
        }}
      >
        {isVisible ? "I'm visible!" : "I'm not visible"}
      </div>
      <div style={{ height: "150vh" }}></div>
    </div>
  );
};
```

---

### `useOutsideClick()`

A React hook that detects clicks outside of a specified element and triggers a callback.

```tsx
"use client";
import { useRef, useState } from "react";
import { useOutsideClick } from "@enotion/hooks";

const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => setIsOpen((prev) => !prev));

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      {isOpen && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: "50px",
            left: "0",
            width: "200px",
            padding: "10px",
            backgroundColor: "lightgray",
            border: "1px solid #ccc",
          }}
        >
          Click outside this box to close it.
        </div>
      )}
    </div>
  );
};
```

---

### `useScreenSize()`

A React hook that provides the current screen size (width and height), screen properties (such as isMobile, isTablet, isDesktop, etc.), and updates on window resize events.

```tsx
"use client";
import { useScreenSize } from "@enotion/hooks";
const Component = () => {
  const { width, height } = useScreenSize();

  return (
    <div>
      <h1>Screen Size</h1>
      <p>
        Width: {width}px, Height: {height}px
      </p>
    </div>
  );
};
```

---

### `useElementSize()`

A React hook that tracks the size (width and height) of a DOM element and updates the size when the element is resized.

```tsx
"use client";
import { useRef } from "react";
import { useElementSize } from "@enotion/hooks";

const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);

  return (
    <div>
      <div
        ref={ref}
        style={{
          resize: "both",
          overflow: "auto",
          padding: "20px",
          border: "1px solid black",
          width: "200px",
          height: "200px",
        }}
      >
        Resize me!
      </div>
      <p>
        Width: {width}px, Height: {height}px
      </p>
    </div>
  );
};
```

---

### `useSearch()`

A React hook that provides search functionality over a dataset based on a query and specified search keys.

```tsx
"use client";
import { useSearch } from "@enotion/hooks";
import { Input, Card } from "@enotion/components";

const Component = () => {
  const data = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" },
    { id: 4, name: "Broccoli", category: "Vegetable" },
  ];

  const { query, setQuery, filteredData } = useSearch(data, [
    "name",
    "category",
  ]);

  return (
    <div>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredData.map((item) => (
        <Card key={item.id}>
          {item.name} - {item.category}
        </Card>
      ))}
    </div>
  );
};
```

---

### `useClipboard()`

A React hook that provides clipboard functionality, allowing you to copy text to the clipboard and track the copy status.

```tsx
"use client";
import { useState } from "react";
import { useClipboard } from "@enotion/hooks";

const Component = () => {
  const [text, setText] = useState("Hello, World!");
  const [error, setError] = useState<Error | null>(null);
  const { isCopied, copy } = useClipboard({
    onCopy: (txt) => console.log("Text copied to clipboard: ", txt),
    onError: (err) => {
      console.error("Failed to copy text: ", err);
      setError(err);
    },
  });

  const handleCopy = () => {
    copy(text);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      {isCopied && <span style={{ color: "green" }}>Copied!</span>}
      {error && <span style={{ color: "red" }}>Error: {error.message}</span>}
    </div>
  );
};
```
