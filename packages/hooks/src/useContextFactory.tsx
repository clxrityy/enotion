import { Consumer, createContext, FC, ReactNode, useContext } from "react";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T
) => {
  Consumer: Consumer<T>;
  Provider: FC<Readonly<{ children: ReactNode }>>;
  useContext: () => T;
}

/**
 * @param initialContextState - The initial state of the context
 * @param useContextState - A hook that returns the current state of the context
 * @returns An object containing the `Consumer`, `Provider`, and `useContext` hook for the context
 *
 * @example
 * ```tsx
 * const { Provider, useContext } = useContextFactory(initialState, useCustomHook);
 * ```
 */
export const useContextFactory: ContextFactory = (
  initialContextState,
  useContextState
) => {
  const Context = createContext(initialContextState);

  const ProviderWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
    const context = useContextState();
    return <Context.Provider value={context}>{children}</Context.Provider>;
  };

  return {
    Consumer: Context.Consumer,
    Provider: ProviderWrapper,
    useContext: () => useContext(Context)
  }
}
