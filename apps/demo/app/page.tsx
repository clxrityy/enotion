"use client";
import { JSX } from "react";
import styles from "./page.module.css";
import {
  usePreload
} from "@enotion/hooks";

const providerImport = () => import("../components/Test");

export default function Home(): JSX.Element {

  const preloadProvider = usePreload(providerImport);

  return (
    <div className={styles.page} {...preloadProvider}>
      <main className={styles.main}>
        this page should preload the provider on hover
      </main>
    </div>
  );
}
