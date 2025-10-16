# `@enotion/components`

- [Installation](#installation)
- [Inherit Styles](#inherit-styles-optional)
- [Customize Styles](#customize-syles)
- [Components](#components)

## Installation

```bash
# npm
npm install @enotion/components
# yarn
yarn add @enotion/components
# pnpm
pnpm add @enotion/components
```

## Inherit styles (Optional)

To inherit the global styles, import the package CSS in your main application file (e.g., `index.tsx`, `App.tsx`, or `globals.css` for Next.js):

```tsx
// In a React/Next.js component file:
import "@enotion/components/index.css";
```

```css
/* In a global CSS file (e.g., globals.css for Next.js): */
@import "@enotion/components/index.css";
```

## Customize styles

Most components accept a `colorPalette` prop to customize their color. [See available color palettes here.](https://github.com/clxrityy/enotion/blob/main/packages/%40enotion/config/constants/colors.ts)

## Components

- [Skeleton](#skeleton)
  - [`<Skeleton />`](#skeleton-)
  - [`<SkeletonWrapper />`](#skeletonwrapper-)
- [`<Button />`](./src/Button.tsx)
- [`<Input />`](./src/Input.tsx)
- [`<Link />`](./src/Link.tsx)
- [`<Select />`](./src/Select.tsx)
- [`<Card />`](./src/Card.tsx)
- [`<Search />`](./src/Search.tsx)
- [`<CopyButton />`](./src/CopyButton.tsx)
- [`<LayoutContainer />`](./src/LayoutContainer.tsx)
- [`<Navbar />`](./src/Navbar.tsx)

---

### Skeleton

#### `<Skeleton />`

A simple skeleton element component for standalone skeleton placeholds.

```tsx
// Basic usage:
<Skeleton width={120} height={20} />;

// With reference element sizing:
const ref = useRef<HTMLDivElement>(null);

return (
  <>
    <div ref={ref}>Content to be measured</div>
    <Skeleton referenceElement={ref} />
  </>
);
```

#### `<SkeletonWrapper />`

A Skeleton wrapper component that measures its children and displays skeleton placeholders with the same dimensions during loading states.

```tsx
import { SkeletonWrapper, Skeleton } from "@enotion/components";

// Basic usage with automatic skeleton generation:
<SkeletonWrapper loading={isLoading}>
  <div className="card">
    <h1>Title</h1>
    <p>Some content here...</p>
  </div>
</SkeletonWrapper>;

// With custom skeleton:
<SkeletonWrapper
  isLoading={isLoading}
  skeleton={<div className="custom-skeleton" />}
>
  <UserProfile />
</SkeletonWrapper>;

// Multiple children with preserved layout:
<SkeletonWrapper isLoading={isLoading}>
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</SkeletonWrapper>;
```

---
