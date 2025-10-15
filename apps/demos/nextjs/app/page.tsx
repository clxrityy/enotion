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
    <div className={styles.page} {...preloadProvider}>
      <main className={styles.main}>
        <Suspense fallback={<Skeleton style={{ width: 300, height: 200 }} />}>
          <Card colorPalette={currentPalette}>
            {isLoading ? (
              <Skeleton style={{ width: 200, height: 20 }} />
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div>Current theme: {theme}</div>
                <div>Current palette: {palette}</div>
                <Button
                  colorPalette={currentPalette}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  Toggle Theme
                </Button>
                <Select
                  colorPalette={currentPalette}
                  options={palettes}
                  value={palette}
                  onChange={(e) => setPalette(e.target.value)}
                  aria-placeholder="Select a color palette"
                />
                <Button
                  colorPalette={currentPalette}
                  onClick={() => {
                    success("This is a success message!");
                  }}
                >
                  Show Notify
                </Button>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  <Button
                    colorPalette={currentPalette}
                    onClick={() => push("/stats")}
                  >
                    Go to Stats Page
                  </Button>
                  <Button
                    colorPalette={currentPalette}
                    onClick={() => push("/preloaded")}
                  >
                    Go to preloaded page
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  <p>Copy this text</p>
                  <CopyButton
                    onCopied={(text) => {
                      success(`${text} copied!`);
                    }}
                    colorPalette={currentPalette}
                    content="Copy this text"
                  />
                </div>
              </div>
            )}
          </Card>
        </Suspense>
      </main>
    </div>
  );
}
