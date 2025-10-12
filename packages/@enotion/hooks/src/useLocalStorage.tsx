import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react";

type DispatchAction<T> = T | ((prevState: T) => T);

type ErrorDispatch = Dispatch<SetStateAction<Error | null>>;

function setItem(key: string, value: unknown, setError: ErrorDispatch): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    setError(error as Error);
  }
}

function getItem<T>(key: string, setError: ErrorDispatch): T | undefined {
  try {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : undefined;
    }
    return undefined;
  } catch (error) {
    setError(error as Error);
    return undefined;
  }
}

function removeItem(key: string, setError: ErrorDispatch): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    setError(error as Error);
  }
}

/**
 *
 * @param key The key under which the value is stored in localStorage
 * @param initialValue The initial value to use if there is no value in localStorage
 * @returns A tuple containing the stored value, a setter function, a remove function, and any error encountered
 *
 * @description
 * The `useLocalStorage` hook is a custom React hook that provides a way to manage state that is synchronized with the browser's localStorage.
 *
 * @example
 * ```tsx
 * const [value, setValue, removeValue, error] = useLocalStorage<T>(key, initialValue);
 *
 * // Set a new value
 * setValue(newValue);
 * // Remove the value from localStorage
 * removeValue();
 * // Access any error that occurred during operations
 * console.log(error);
 * ```
 *
 * @see {@link https://reactjs.org/docs/hooks-state.html|React useState}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage|localStorage}
 *
 * @module useLocalStorage
 */
export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [error, setError] = useState<Error | null>(null);
  const [value, setValue] = useState<T>(initialValue as T);

  // Initialize from localStorage after hydration
  useEffect(() => {
    const data = getItem<T>(key, setError);
    if (data !== undefined) {
      setValue(data);
    }
  }, [key]);

  const handleDispatch = useCallback(
    (action: DispatchAction<T>) => {
      if (typeof action === "function") {
        setValue((prevState) => {
          const newValue = (action as (prevState: T) => T)(prevState);
          setItem(key, newValue, setError);
          return newValue;
        });
      } else {
        setValue(action);
        setItem(key, action, setError);
      }
    },
    [key],
  );

  const handleRemove = useCallback(() => {
    setValue(undefined as T);
    removeItem(key, setError);
  }, [key]);

  return [value, handleDispatch, handleRemove, error] as const;
}
