import { LayoutContextProvider, LayoutRenderer } from "@enotion/core";
import { Provider, type ProviderProps } from "./Provider.js";
import "@enotion/core/index.css";

export interface LayoutProviderProps extends Omit<ProviderProps, "children"> {
  children?: React.ReactNode;
}

/**
 * LayoutProvider component that wraps the application with layout context and rendering.
 * It uses the Provider component to manage theme and color palette contexts.
 * @param children - The child components that will have access to the layout, theme, and color palette contexts.
 * @param palette - Optional color palette to be applied to all children.
 * @param theme - Optional theme to be applied to the provider.
 * @param props - Additional HTML attributes for the LayoutRenderer component.
 *
 * @description
 * The `LayoutProvider` component combines the `LayoutContextProvider` and the `Provider` component to offer a unified context for managing layout, themes, and color palettes in a React application.
 * It automatically injects the specified color palette into all child components that can accept the `colorPalette` prop, ensuring consistent styling across the application.
 * The provider supports three themes: "system", "light", and "dark", allowing for dynamic theme management.
 * Additionally, it renders the `LayoutRenderer` component to handle layout rendering.
 *
 * @example
 * ```tsx
 * import { LayoutProvider } from '@enotion/components';
 * import "@enotion/core/index.css"; // Import animations
 *
 * const App = () => (
 *   <LayoutProvider>
 *     {children}
 *   </LayoutProvider>
 * );
 * ```
 * @see {@link Provider} for more details on theme and color palette management.
 * @see {@link LayoutContextProvider} for more details on layout context management.
 * @see {@link LayoutRenderer} for more details on layout rendering.
 *
 */
export const LayoutProvider = ({
  children,
  palette,
  theme,
  notificationOptions,
  ...props
}: Readonly<LayoutProviderProps>) => {
  return (
    <LayoutContextProvider>
      <Provider
        palette={palette}
        theme={theme}
        notificationOptions={notificationOptions}
      >
        <LayoutRenderer {...props} />
        {children}
      </Provider>
    </LayoutContextProvider>
  );
};
