// session context
// to manage user session state across the application

import { ReactNode, useState } from "react";
import { createContextFactory } from "../utils";
import { initialLayoutContextState, LayoutContextState } from "./layout";
import { ColorPalette, ColorPalettes } from "../constants";

export interface SessionData {
  layoutState?: LayoutContextState;
  palettes?: typeof ColorPalettes;
}

export interface SessionContextState extends SessionData {
  setLayoutState: (state: LayoutContextState) => void;
  setPalettes: (palettes: typeof ColorPalettes) => void;
  addPalette: (palette: ColorPalette, name: string) => void;
  removePalette?: (name: string) => void;
}

const initialSessionContextState: SessionContextState = {
  layoutState: undefined,
  palettes: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLayoutState: (state: LayoutContextState) => {},
  setPalettes: (palettes: typeof ColorPalettes) => {},
  addPalette: (palette: ColorPalette, name: string) => {},
  removePalette: (name: string) => {},
};

const useSessionContextState = (): SessionContextState => {
  const [layoutState, setLayoutState] = useState<LayoutContextState>(
    initialLayoutContextState,
  );
  const [palettes, setPalettesState] =
    useState<typeof ColorPalettes>(ColorPalettes);

  const setPalettes = (newPalettes: typeof ColorPalettes) => {
    setPalettesState(newPalettes);
  };

  const addPalette = (palette: ColorPalette, name: string) => {
    setPalettesState((prevPalettes) => ({
      ...prevPalettes,
      [name]: palette,
    }));
  };

  const removePalette = (name: string) => {
    setPalettesState((prevPalettes) => {
      const newPalettes = { ...prevPalettes };
      delete newPalettes[name];
      return newPalettes;
    });
  };

  return {
    layoutState,
    setLayoutState,
    palettes,
    setPalettes,
    addPalette,
    removePalette,
  };
};

export interface SessionContextProviderProps {
  children: ReactNode;
}

const { Provider, useContext } = createContextFactory<SessionContextState>(
  initialSessionContextState,
  useSessionContextState,
);

/**
 * SessionContextProvider - A context provider component for the session context.
 * @param props - The props for the SessionContextProvider component.
 * @returns A React component that provides the session context to its children.
 *
 * @description
 * The `SessionContextProvider` component uses the `createContextFactory` utility to create a context provider for managing user session state.
 * It leverages the `useSessionContextState` hook to handle the state and logic for session management, including layout state and color palettes.
 * This provider should wrap the part of the application where session context is needed, allowing any nested components to access and modify the session state.
 */
export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  return <Provider>{children}</Provider>;
};

/**
 * useSessionContext - A hook to access the session context.
 * @returns The current session context state and methods to manipulate it.
 * @description
 * The `useSessionContext` hook provides access to the session context created by the `SessionContextProvider`.
 * It allows components to read and update the user session state, including layout preferences and color palettes.
 * This hook simplifies the process of consuming the session context within functional components.
 *
 * @example
 * ```tsx
 * import { useSessionContext } from '@enotion/core/contexts';
 *
 * const MyComponent = () => {
 *   const { layoutState, setLayoutState } = useSessionContext();
 *
 *   // Use layoutState and setLayoutState as needed
 * };
 * ```
 */
export const useSessionContext = () => useContext();
