"use client";
import { useColorPalette, usePreload, useTheme } from "@enotion/hooks";
import {
  Button,
  Card,
  Select,
  Skeleton,
  CopyButton,
} from "@enotion/components";
import { Suspense, useEffect, useState, type JSX } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ColorPaletteType } from "@enotion/core/constants";
import { useNotify } from "@enotion/notify";

const providerImport = () => import("../components/Test");

export default function Home(): JSX.Element {
  const preloadProvider = usePreload(providerImport);

  const { success } = useNotify();
  const {
    palette: currentPalette,
    setPalette,
    getAllPalettes,
  } = useColorPalette();
  const { theme, setTheme } = useTheme();

  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const { theme, toggle } = useTheme();

  const palette: ColorPaletteType = currentPalette || "dark";
  // theme === "dark" ? "dark" : "default";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const palettes = Object.keys(getAllPalettes()).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <div style={{
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      color: theme === "dark" ? "#eee" : "#111"
    }} className={styles.page} {...preloadProvider}>
      <main className={styles.main}>
        <Suspense fallback={<Skeleton style={{ width: "600px", height: "200px" }} />}>
          <Card colorPalette={palette}>
            <h1>Welcome to the Enotion Next.js Demo!</h1>
          </Card>
        </Suspense>
        {
          isLoading ? (
            <Skeleton style={{ width: "600px", height: "400px" }} />
          ) : (
            <Card colorPalette={palette} style={{ padding: "2rem", maxWidth: "600px", width: "100%" }}>
              <p>
                This demo showcases the Enotion component library integrated with Next.js.
                Explore the features and components by interacting with the options below.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <Button colorPalette={palette} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  Toggle Theme (Current: {theme})
                </Button>
                <Select
                  colorPalette={palette}
                  options={palettes}
                  value={currentPalette || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPalette(value);
                    success(`Color palette set to ${value}`);
                  }}
                  style={{ minWidth: "200px" }}
                />
                <CopyButton
                  colorPalette={palette}
                  content="npm install @enotion/components @enotion/hooks @enotion/core @enotion/notify"
                  onCopy={() => success("Command copied to clipboard!")}
                >
                  Copy Install Command
                </CopyButton>
                <Button colorPalette={palette} onClick={() => push("/test-layout")}>
                  Go to LayoutContainer Test Page
                </Button>
              </div>
            </Card>
          )
        }
      </main>
    </div>
  );
}
