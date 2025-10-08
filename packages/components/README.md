# `@enotion/components`

## Installation

```bash
# npm
npm install @enotion/components
# yarn
yarn add @enotion/components
# pnpm
pnpm add @enotion/components
```

## Components

- [Skeleton](#skeleton)
  - [`<Skeleton />`](#skeleton-)
  - [`<SkeletonWrapper />`](#skeletonwrapper-)

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
