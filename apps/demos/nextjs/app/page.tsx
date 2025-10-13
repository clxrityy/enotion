"use client";
import { usePreload, useTheme } from "@enotion/hooks";
import { SkeletonWrapper, Button, Card } from "@enotion/components";
import { useEffect, useState, type JSX } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ColorPaletteType } from "@enotion/core/constants";

const providerImport = () => import("../components/Test");

export default function Home(): JSX.Element {
  const preloadProvider = usePreload(providerImport);

  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const { theme, toggle } = useTheme();

  const palette: ColorPaletteType = "dark";
  // theme === "dark" ? "dark" : "default";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page} {...preloadProvider}>
      <main className={styles.main}>
        this page should preload the provider on hover
        <SkeletonWrapper isLoading={loading}>
          <div
            style={{
              width: "100%",
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
              colorPalette={palette}
              onClick={() => push("/preload-test")}
            >
              Go to preload test to view preloaded context value <br />
            </Button>
            <Button colorPalette={palette} onClick={() => push("/stats")}>
              Go to stats page to view server module data fetching
            </Button>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "20px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>Current theme: {theme}</div>
            <Button colorPalette={palette} onClick={toggle}>
              Toggle Theme
            </Button>
            {/* <Select
              colorPalette={palette}
              options={[
                {
                  value: "1",
                  label: "one"
                },
                {
                  value: "2",
                  label: "two"
                },
              ]}
            /> */}
            <Card colorPalette={palette}>This is a card component</Card>
          </div>
        </SkeletonWrapper>
      </main>
    </div>
  );
}
