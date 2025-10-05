"use client";

import { createContextFactory } from "@enotion/hooks";
import type { ReactNode } from "react";

const initialState = { value: "initial" };

const useContextState = () => initialState;

export const { Provider, useContext } = createContextFactory(
  initialState,
  useContextState,
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};
