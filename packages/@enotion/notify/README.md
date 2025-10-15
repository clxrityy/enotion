# `@enotion/notify`

A simple and customizable notification system for React applications.

## Features

- Easy to use hooks for triggering notifications
- Supports different notification types (success, error, info, warning, loading)
- Customizable duration and styles
- Dismissible notifications

[![Image from Gyazo](https://i.gyazo.com/38449ac95e5017b7a3282044c9a6cdcc.png)](https://gyazo.com/38449ac95e5017b7a3282044c9a6cdcc)
[![Image from Gyazo](https://i.gyazo.com/101c4bb842347a5dea36a772817e1e59.png)](https://gyazo.com/101c4bb842347a5dea36a772817e1e59)
[![Image from Gyazo](https://i.gyazo.com/f09e3a385c9046dcbd3b61ba9f378e91.png)](https://gyazo.com/f09e3a385c9046dcbd3b61ba9f378e91)
[![Image from Gyazo](https://i.gyazo.com/27e6a0cb4567802175cf31c9c9b35ca3.png)](https://gyazo.com/27e6a0cb4567802175cf31c9c9b35ca3)

## Installation

```bash
npm install @enotion/notify
# or
yarn add @enotion/notify
# or
pnpm add @enotion/notify
```

## Usage

Wrap your application with the `NotificationProvider`:

```tsx
// layout.tsx
"use client";
import { NotificationProvider } from "@enotion/notify";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider position="top-right">{children}</NotificationProvider>
  );
}

// page.tsx
("use client");
import { useNotify } from "@enotion/notify";
import "@enotion/notify/index.css"; // Import the CSS for notifications (optional)

export default function Page() {
  const { notify, success, error, info, warning, loading, dismissAll } =
    useNotify();

  return (
    <div>
      <button onClick={() => notify("This is a default notification!")}>
        Default Notification
      </button>
      <button onClick={() => success("This is a success notification!")}>
        Success Notification
      </button>
      <button onClick={() => error("This is an error notification!")}>
        Error Notification
      </button>
      <button onClick={() => info("This is an info notification!")}>
        Info Notification
      </button>
      <button onClick={() => warning("This is a warning notification!")}>
        Warning Notification
      </button>
      <button onClick={() => loading("This is a loading notification...")}>
        Loading Notification
      </button>
      <button onClick={() => dismissAll()}>Dismiss All Notifications</button>
    </div>
  );
}
```
