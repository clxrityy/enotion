"use client";

import { ColorPalettes, packages } from "@enotion/core";
import { useColorPalette } from "@enotion/hooks";
import { CSSProperties } from "react";
import { Logo } from "./components";
import { CodeBlock, CopyButton, Table } from "@enotion/components";


export default function Home() {
  const { palette } = useColorPalette();

  const colors = palette ? ColorPalettes[palette] : ColorPalettes["default"];

  const pkgRows: { title: string, items: string[] }[] = [];

  for (const pkg of packages) {

    const installCmd = `npm i ${pkg.name}`

    const Snippet = () => <div className="relative flex items-stretch flex-row-reverse justify-start w-max"><CodeBlock palette={palette} language="zsh" key={pkg.slug} className="text-xs">
      {installCmd}
    </CodeBlock>
      <CopyButton palette={palette} content={installCmd} className="absolute" />
    </div>;

    pkgRows.push({
      title: pkg.name,
      items: [pkg.description, Snippet()] as string[],
    });
  }

  return (
    <div
      className="p-8 h-[calc(100vh-4rem)] flex flex-col gap-10"
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
      <div className="flex flex-col items-stretch gap-1 max-w-lg">
        <p className="text-sm sm:text-base md:text-lg xl:text-2xl text-muted-foreground tracking-wide">
          <b className="font-mono">enotion</b> is an open-source collection of packages to build responsive and accessible web applications
          with ease.
        </p>
        <span className="animate-spin-slower duration-1000 transition-transform w-9 h-3 m-6 rounded-full saturate-150 backdrop-blur-lg flex items-center justify-center">
          <Logo palette={palette} />
        </span>
      </div>

      <div className="flex gap-4">
        {/* <Button
          palette={palette}
          variant="default"
          onClick={() => setIsOpen(true)}
        >
          Show Modal
        </Button> */}
        <Table palette={palette} responsive striped bordered rows={pkgRows}
        />
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
