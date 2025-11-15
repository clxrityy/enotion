# `@enotion/components`

[View documentation](https://enotion-beta.vercel.app/packages/components)

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

Most components accept a `palette` prop to customize their colors. [See available color palettes here.](https://github.com/clxrityy/enotion/blob/main/packages/%40enotion/config/constants/colors.ts)
