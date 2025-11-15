"use client";

import { adjustHexColorOpacity, ColorPalettes, packages } from "@enotion/core";
import { Icons } from "@enotion/core/constants";
import { useColorPalette } from "@enotion/hooks";
import { CSSProperties, useState } from "react";
import { Logo } from "./components";
import {
  Button,
  Card,
  CodeBlock,
  CopyButton,
  Select,
  SkeletonWrapper,
  Table,
} from "@enotion/components";
import Link from "next/link";

export default function Home() {
  const { palette, setPalette } = useColorPalette();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const colors = palette ? ColorPalettes[palette] : ColorPalettes["default"];

  const pkgRows: { title: string; items: string[] }[] = [];

  for (const pkg of packages) {
    const installCmd = `npm i ${pkg.name}`;

    const Snippet = () => (
      <div className="relative flex items-stretch flex-row-reverse justify-stretch w-full lg:w-[75%] mr-2 pr-2 h-fit scroll-smooth overflow-scroll">
        <CodeBlock
          palette={palette}
          language="zsh"
          key={pkg.slug}
          className="text-xs w-full min-w-[200px] md:text-sm lg:text-base"
        >
          {installCmd}
        </CodeBlock>
        <CopyButton
          palette={palette}
          content={installCmd}
          className="absolute inset-y-0 right-0"
        />
      </div>
    );

    pkgRows.push({
      title: pkg.name.split("/")[1] || "",
      items: [pkg.description, Snippet()] as string[],
    });
  }

  return (
    <div
      className="p-8 h-screen md:h-[calc(100vh-4rem)] flex flex-col gap-10 w-full overflow-y-auto"
      style={
        {
          "--muted": colors?.muted,
          "--foreground": colors?.foreground,
          "--background": colors?.background,
          "--primary": colors?.primary,
          "--secondary": colors?.secondary,
          "--tertiary": colors?.tertiary,
          "--accent": colors?.accent,
          "--border": colors?.border,
          "--highlight": colors?.highlight,
          "--success": colors?.success,
          "--warning": colors?.warning,
          "--error": colors?.error,
          "--info": colors?.info,
        } as CSSProperties
      }
    >
      <div className="flex flex-col lg:flex-row gap-5 items-center justify-center w-full">
        <Card
          palette={palette}
          className="p-6 max-w-3xl mx-auto shadow-lg rounded-lg"
          style={{
            border: `0.75px solid ${adjustHexColorOpacity(colors?.border || "", 0.75)}`,
          }}
        >
          <div className="flex flex-col-reverse md:flex-row items-stretch gap-1 max-w-lg">
            <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-muted-foreground tracking-wide">
              <b className="font-mono">enotion</b> is an open-source collection
              of packages to build responsive and accessible web applications
              with ease.
            </p>
            <div className="mx-auto">
              <span className="animate-spin-slower duration-1000 transition-transform w-9 h-3 m-6 rounded-full saturate-150 backdrop-blur-lg flex items-center justify-center">
                <Logo palette={palette} />
              </span>
            </div>
          </div>
        </Card>
        <Button
          onMouseLeave={() => setIsHovered(!isHovered)}
          onMouseEnter={() => setIsHovered(!isHovered)}
          palette={palette}
          variant="outline"
          className="transition-transform duration-500 ease-linear"
        >
          <Link
            aria-label="All packages"
            href="/packages"
            style={{
              color: "var(--foreground)",
            }}
            className="transition-transform"
          >
            {!isHovered ? (
              <Icons.Package size={75} />
            ) : (
              <Icons.PackageOpen size={75} />
            )}
          </Link>
        </Button>
      </div>

      <div className="flex gap-10 flex-col w-full items-center w-full">
        {/* <Button
          palette={palette}
          variant="default"
          onClick={() => setIsOpen(true)}
        >
          Show Modal
        </Button> */}
        <div className="flex flex-col sm:flex-row items-center h-full">
          <div className="flex flex-col gap-6 w-full mx-auto items-center">
            <div className="flex flex-col sm:flex-row max-w-md items-center gap-2">
              <label
                htmlFor="palette-select"
                className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-foreground"
              >
                Change the current color palette:
              </label>
              <Select
                palette={palette}
                options={Object.keys(ColorPalettes).map((key) => ({
                  label: key.charAt(0).toUpperCase() + key.slice(1),
                  value: key,
                }))}
                style={{
                  boxShadow: `0 0 6px ${adjustHexColorOpacity(
                    colors?.primary || "#000000",
                    0.25,
                  )}, 0 0 12px ${adjustHexColorOpacity(
                    colors?.secondary || "#000000",
                    0.15,
                  )}`,
                  padding: "0.75rem 1rem",
                }}
                className="text-inherit"
                value={palette}
                onChange={(e) =>
                  setPalette(e.target.value as keyof typeof ColorPalettes)
                }
              />
            </div>
            <Button
              palette={palette}
              onClick={() => setIsLoading(!isLoading)}
              className="flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl"
            >
              {isLoading ? "Stop Loading" : "Start Loading"}
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <SkeletonWrapper
            isLoading={isLoading}
            palette={palette}
            className="w-full h-full"
            style={{}}
          >
            <div className="w-full flex items-center justify-center">
              <div className="max-w-xl md:max-w-2xl lg:max-w-5xl w-full h-full lg:mx-auto">
                <Table
                  palette={palette}
                  responsive
                  striped
                  bordered
                  rows={pkgRows}
                  hidden={isLoading}
                  className="shadow-inner"
                />
                {isLoading &&
                  pkgRows.map((pkg) => (
                    <div
                      key={pkg.title}
                      className="w-20 h-12 mb-4 rounded-md bg-muted animate-pulse"
                    />
                  ))}
              </div>
            </div>
          </SkeletonWrapper>
        </div>
      </div>

      {/* <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Skeleton Test</h2>
        <SkeletonWrapper
          palette={palette}
          isLoading={isLoading}
          skeleton={undefined}
          className=""
          style={{}}
        >
          <p>
            This is some text that will be replaced with skeleton when loading.
          </p>
          <h3>A Heading</h3>
          <div>Some other content</div>
        </SkeletonWrapper>
      </div> */}

      {/* <AnimatedModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        modalId="modal-test"
        palette={palette}
        animationConfig={{}}
      >
        <h2 className="text-2xl font-semibold mb-4">Hello from Modal!</h2>
      </AnimatedModal> */}
    </div>
  );
}
