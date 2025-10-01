"use client";
import { JSX } from "react";
import styles from "./page.module.css";
import { useContextFactory } from "@enotion/hooks";

const TestComponent = ({ context }: { context: { value: string } }) => {

  return <div>{context.value}</div>;
};

export default function Home(): JSX.Element {

  const initialState = { value: "initial" };
  const useContextState = () => initialState;

  const { Provider, useContext } = useContextFactory(
    initialState,
    useContextState
  );

  return (
    <Provider>
      <div className={styles.page}>
        <main className={styles.main}>
          <TestComponent context={useContext()} />
        </main>
      </div>
    </Provider>
  );
}
