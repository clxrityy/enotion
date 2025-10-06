import { useState } from "react";
import { createContextFactory } from "./createContextFactory.js";
import { useLocalStorage } from "./useLocalStorage.js";

/** Theme type representing the possible theme values */
export type Theme = "system" | "light" | "dark";

/**
 * ThemeContext - The context interface for theme management.
 * @property theme - The current theme, which can be "system", "light", or "dark".
 * @property setTheme - A function to update the current theme.
 *
 * @description
 * The `ThemeContext` interface defines the structure of the context used for managing theme preferences in a React application.
 * It includes the current theme and a method to update it. This context is typically provided by the `ThemeProvider` component
 * and consumed via the `useTheme` hook.
 *
 * @see {@link ThemeProvider} - A context provider component for the theme context.
 * @see {@link useTheme} - A custom React hook for accessing and manipulating theme context.
 * @module ThemeContext
 */
export interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialThemeContext: ThemeContext = {
  theme: "system",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
};

const useThemeContext = () => {
  const [theme, setTheme] = useState<Theme>(initialThemeContext.theme);

  const [_, setStoredTheme] = useLocalStorage<Theme>("theme", theme);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  return {
    theme: theme,
    setTheme: updateTheme,
  };
};

const { Provider, useContext } = createContextFactory<ThemeContext>(
  initialThemeContext,
  useThemeContext,
);

/**
 * ThemeProvider - A context provider component for the theme context.
 * @param props - The props for the ThemeProvider component.
 * @returns A React component that provides the theme context to its children.
 *
 * @description
 * The `ThemeProvider` component uses the `createContextFactory` utility to create a context provider for managing theme preferences.
 * It leverages the `useThemeContext` hook to handle the state and logic for theme management, including persistence in localStorage.
 * This provider should wrap the part of the application where theme context is needed, allowing any nested components to access and modify the theme.
 * It supports three themes: "system", "light", and "dark".
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@enotion/hooks';
 *
 * const App = () => (
 *   <ThemeProvider>
 *     {children}
 *   </ThemeProvider>
 * );
 * ```
 * @see {@link useTheme} - The hook to access and manipulate the theme context.
 * @see {@link useLocalStorage} - A custom hook for managing localStorage interactions.
 * @see {@link createContextFactory} - A utility for creating context providers and hooks.
 * @module ThemeProvider
 */
export const ThemeProvider = Provider;

/**
 * useTheme - A custom React hook for accessing and manipulating theme context.
 * @returns An object containing the current theme and a function to update it.
 *
 * @description
 * The `useTheme` hook provides access to the theme context created by `ThemeProvider`.
 * It returns the current theme and a function to update it. This hook must be used within
 * a component that is wrapped by `ThemeProvider`.
 *
 * @example
 * ```tsx
 * import { useTheme } from '@enotion/hooks';
 *
 * const MyComponent = () => {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <div>
 *       Current theme: {theme}
 *       <button onClick={() => setTheme('dark')}>Switch to Dark</button>
 *     </div>
 *   );
 * };
 * ```
 * @see {@link ThemeProvider} - A context provider component for the theme context.
 * @see {@link useLocalStorage} - A custom hook for managing localStorage interactions.
 * @see {@link createContextFactory} - A utility for creating context providers and hooks.
 * @module useTheme
 */
export const useTheme = useContext;
