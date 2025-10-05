import {
  type Consumer,
  createContext,
  type FC,
  type ReactNode,
  useContext,
} from "react";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T,
) => {
  Consumer: Consumer<T>;
  Provider: FC<Readonly<{ children: ReactNode }>>;
  useContext: () => T;
};

/**
 * @param initialContextState - The initial state of the context
 * @param useContextState - A hook that returns the current state of the context
 * @returns An object containing the `Consumer`, `Provider`, and `useContext` hook for the context
 *
 * @description
 * The `createContextFactory` function is a utility for creating a React context along with its provider and a custom hook to access the context value.
 * It takes an initial state and a hook that provides the current state of the context.
 * The function returns an object containing the `Consumer`, `Provider`, and a `useContext` hook for easy access to the context value within functional components.
 *
 * @example
 * ```tsx
 * const { Provider, useContext } = useContextFactory(initialState, useCustomHook);
 * ```
 */
export const createContextFactory: ContextFactory = (
  initialContextState,
  useContextState,
) => {
  const Context = createContext(initialContextState);

  const ProviderWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
    const context = useContextState();
    return <Context.Provider value={context}>{children}</Context.Provider>;
  };

  return {
    Consumer: Context.Consumer,
    Provider: ProviderWrapper,
    useContext: () => useContext(Context),
  };
};
