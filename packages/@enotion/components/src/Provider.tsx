import { ColorPalettes, ColorPaletteType } from "@enotion/core";
import { ColorPaletteProvider, Theme, ThemeProvider } from "@enotion/hooks";
import { NotificationProvider, NotificationProps } from "@enotion/notify";
import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";
import "@enotion/notify/index.css";

export interface ProviderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  palette?: ColorPaletteType;
  theme?: Theme;
  notificationOptions?: Omit<NotificationProps, "children">;
}

/**
 * Provider - A combined provider for Theme and Color Palette contexts.
 * @param children - The child components that will have access to the theme and color palette contexts.
 * @param palette - Optional color palette to be applied to all children.
 * @param theme - Optional theme to be applied to the provider.
 * @param props - Additional HTML attributes for the provider component.
 *
 * @description
 * The `Provider` component combines the `ThemeProvider` and `ColorPaletteProvider` to offer a unified context for managing themes and color palettes in a React application.
 * It automatically injects the specified color palette into all child components that can accept the `colorPalette` prop, ensuring consistent styling across the application.
 * The provider supports three themes: "system", "light", and "dark", allowing for dynamic theme management.
 *
 * @example
 * ```tsx
 * import { Provider } from '@enotion/components';
 *
 * const App = () => (
 *   <Provider colorPalette="solarized" theme="dark">
 *     {children}
 *   </Provider>
 * );
 * ```
 */
export const Provider = ({
  children,
  palette,
  theme,
  notificationOptions,
  ...props
}: Readonly<ProviderProps>) => {
  const defaultPalette =
    theme === "dark" ? ColorPalettes.dark : ColorPalettes.default;
  const color = palette ? ColorPalettes[palette] : defaultPalette;

  const injectColorPaletteToChildren = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      // Type assertion for child.props
      const existingProps = child.props as Record<string, any>;

      // Clone the element and inject colorPalette if it doesn't already have one
      const childProps = {} as Record<string, any>;

      // Only inject colorPalette into custom components (not native DOM elements like div, span, etc.)
      // Native DOM elements have string types (e.g., "div"), custom components have function/object types
      const isCustomComponent = typeof child.type !== "string";

      if (color && !existingProps.palette && isCustomComponent) {
        childProps.palette = color;
      }

      // Recursively process nested children (for both custom components and DOM elements)
      if (existingProps.children) {
        childProps.children = injectColorPaletteToChildren(
          existingProps.children,
        );
      }

      // Clone the element with the new props
      return cloneElement(child, childProps);
    });
  };

  const processedChildren = injectColorPaletteToChildren(children);

  return (
    <ThemeProvider {...props}>
      <ColorPaletteProvider>
        <NotificationProvider {...notificationOptions}>
          {processedChildren}
        </NotificationProvider>
      </ColorPaletteProvider>
    </ThemeProvider>
  );
};
