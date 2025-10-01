import { useExampleHook } from "@enotion/hooks";
import styles from "./page.module.css";

export default function Home() {
  const example = useExampleHook("hey");

  return (
    <div className={styles.page}>
      <main className={styles.main}>{example}</main>
    </div>
  );
}
