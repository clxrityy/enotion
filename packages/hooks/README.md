# @enotion/hooks

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

### `useContextFactory()`

A custom hook that creates a context provider and a hook to consume the context.

```tsx
"use client";
import { useContextFactory } from "@enotion/hooks";

const initialState = { value: "initial" };
const { Provider, useContext } = useContextFactory(initialState);

const MyComponent = () => {
  const context = useContext();
  return <div>{context.value}</div>;
};

export default function Page() {
  return (
    <Provider>
      <MyComponent />
    </Provider>
  );
}
```
