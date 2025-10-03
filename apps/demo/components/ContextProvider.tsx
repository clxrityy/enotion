"use client";

import { useContextFactory } from "@enotion/hooks";
import { ReactNode } from "react";

const initialState = { value: "initial" };

const useContextState = () => initialState;

export const { Provider, useContext } = useContextFactory(
  initialState,
  useContextState,
);


export const ContextProvider = ({ children }: { children: ReactNode }) => {

  return <Provider>{children}</Provider>;
};
