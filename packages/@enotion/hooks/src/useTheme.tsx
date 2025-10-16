import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useLocalStorage } from "./useLocalStorage.js";

/** Theme type representing the possible theme values */
export type Theme = "system" | "light" | "dark";

/**
 * ThemeContext - The context interface for theme management.
 * @property theme - The current theme, which can be "system", "light", or "dark".
 * @property setTheme - A function to update the current theme.
 * @property toggle - A function to toggle between "light" and "dark" themes.
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
  setTheme: (theme: Theme) => Theme;
  toggle: () => void;
}

const initialThemeContext: ThemeContext = {
  theme: "system",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (theme: Theme) => theme,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
};

// Create a simple context without the factory pattern
const Context = createContext<ThemeContext>(initialThemeContext);

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
 * - "system": Adapts to the user's system theme preference.
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
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>(
    "theme",
    "system",
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration to prevent SSR mismatches
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let cleanup: (() => void) | undefined;

    // Check if matchMedia is available (it might not be in test environments)
    if (globalThis.window !== undefined) {
      const mql = globalThis.matchMedia("(prefers-color-scheme: dark)");

      // Only auto-set system preference if user hasn't explicitly chosen a theme
      if (storedTheme === "system") {
        const systemTheme: Theme = mql.matches ? "dark" : "light";
        // Apply system theme to DOM but keep stored theme as "system"
        document.documentElement.dataset.theme = systemTheme;
      }

      const listener = (e: MediaQueryListEvent) => {
        // Only respond to system changes if user has "system" preference
        if (storedTheme === "system") {
          const newSystemTheme: Theme = e.matches ? "dark" : "light";
          document.documentElement.dataset.theme = newSystemTheme;
        }
      };
      mql.addEventListener("change", listener);

      cleanup = () => mql.removeEventListener("change", listener);
    }

    return () => {
      cleanup?.();
    };
  }, [storedTheme, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      if (storedTheme === "system") {
        // Determine actual system theme
        const systemIsDark =
          globalThis.window !== undefined &&
          globalThis.matchMedia &&
          globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.dataset.theme = systemIsDark
          ? "dark"
          : "light";
      } else {
        document.documentElement.dataset.theme = storedTheme;
      }
    }
  }, [storedTheme, isHydrated]);

  const setThemeCallback = useCallback(
    (theme: Theme) => {
      setStoredTheme(theme);
      return theme;
    },
    [setStoredTheme],
  );

  const toggleCallback = useCallback(() => {
    setStoredTheme(storedTheme === "dark" ? "light" : "dark");
  }, [storedTheme, setStoredTheme]);

  const value = useMemo(
    () => ({
      theme: isHydrated ? storedTheme : "system",
      toggle: toggleCallback,
      setTheme: setThemeCallback,
    }),
    [storedTheme, isHydrated, setThemeCallback, toggleCallback],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

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
export const useTheme = () => useContext(Context);
