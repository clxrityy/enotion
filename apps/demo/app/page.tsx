"use client";
import { usePreload } from "@enotion/hooks";
import { Skeleton, SkeletonWrapper } from "@enotion/components";
import { useEffect, useState, type JSX } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const providerImport = () => import("../components/Test");

export default function Home(): JSX.Element {
  const preloadProvider = usePreload(providerImport);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper
      isLoading={loading}
      skeleton={
        <Skeleton
          className={styles.main}
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <div className={styles.page} {...preloadProvider}>
        <main className={styles.main}>
          this page should preload the provider on hover
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
            <Link
              href={"/preload-test"}
              style={{
                color: "#0070f3ff",
                textDecoration: "underline",
              }}
            >
              Go to preload test to view preloaded context value
            </Link>
            <Link
              href={"/stats"}
              style={{
                color: "#0070f3ff",
                textDecoration: "underline",
              }}
            >
              Go to stats page to view server module data fetching
            </Link>
          </div>
        </main>
      </div>
    </SkeletonWrapper>
  );
}
