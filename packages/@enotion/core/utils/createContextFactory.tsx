import {
  type Consumer,
  createContext,
  type FC,
  type ReactNode,
  useContext,
} from "react";

/**
 * ContextFactory - A type definition for a function that creates a context factory.
 * @template T - The type of the context state.
 * @param initialContextState - The initial state of the context.
 * @param useContextState - A hook that returns the current state of the context.
 * @returns An object containing the `Consumer`, `Provider`, and `useContext` hook for the context.
 *
 * @see {@link https://reactjs.org/docs/context.html|React Context}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usecontext|React useContext}
 * @see {@link https://reactjs.org/docs/components-and-props.html|React Components and Props}
 *
 * @module ContextFactory
 */
export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T,
) => {
  Consumer: Consumer<T>;
  Provider: FC<Readonly<{ children: ReactNode; context?: {} }>>;
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
 * const { Provider, useContext } = createContextFactory(initialState, useCustomHook);
 * ```
 *
 * @module createContextFactory
 */
export const createContextFactory: ContextFactory = (
  initialContextState,
  useContextState,
) => {
  const Context = createContext(initialContextState);

  const ProviderWrapper = ({
    children,
    context,
  }: Readonly<{ children: ReactNode; context?: {} }>) => {
    const ctx = useContextState();

    const fullContext = Object.defineProperties(ctx, {
      ...(context ? { context: { ...context, writable: false } } : {}),
    });

    return <Context.Provider value={fullContext}>{children}</Context.Provider>;
  };

  return {
    Consumer: Context.Consumer,
    Provider: ProviderWrapper,
    useContext: () => useContext(Context),
  };
};
