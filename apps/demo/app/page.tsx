"use client";
import { usePreload } from "@enotion/hooks";
import { SkeletonWrapper, Button, Input } from "@enotion/components";
import { useEffect, useState, type JSX } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const providerImport = () => import("../components/Test");

export default function Home(): JSX.Element {
  const preloadProvider = usePreload(providerImport);

  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page} {...preloadProvider}>
      <main className={styles.main}>
        this page should preload the provider on hover
        <SkeletonWrapper
          isLoading={loading}
        >
          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Button
              colorPalette="trustInBlue"
              onClick={() => push("/preload-test")}
            >
              Go to preload test to view preloaded context value <br />
              <span style={{ fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginTop: "5px" }}>
                <pre style={{
                  fontWeight: 700
                }}>trustInBlue</pre> color palette
              </span>
            </Button>
            <Button colorPalette="dark" onClick={() => push("/stats")}>
              Go to stats page to view server module data fetching
              <br />
              <span style={{ fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginTop: "5px" }}><pre style={{
                fontWeight: 700,
              }}>dark</pre> color palette</span>
            </Button>
            <Input
              placeholder="Dark color palette input"
              colorPallete="dark"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </SkeletonWrapper>
      </main>
    </div>
  );
}
