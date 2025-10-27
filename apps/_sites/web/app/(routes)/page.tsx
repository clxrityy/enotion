"use client";

import { AnimatedModal, Button, SkeletonWrapper } from "@enotion/components";
import { ColorPalettes } from "@enotion/core";
import { useColorPalette } from "@enotion/hooks";
import { CSSProperties, useState } from "react";

export default function Home() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { palette } = useColorPalette();

  const colors = palette ? ColorPalettes[palette] : ColorPalettes["default"];

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col gap-10" style={{
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
    } as CSSProperties}>
      <h1 className="text-3xl font-bold mb-4">Welcome to My Site</h1>

      <div className="flex gap-4">
        <Button palette={palette} variant="default" onClick={() => setIsOpen(true)}>Show Modal</Button>
        <Button palette={palette} variant="default" onClick={toggleLoading}>
          {isLoading ? "Stop Loading" : "Test Skeleton"}
        </Button>
        <Button palette={palette} variant="default"><a href="/test-mdx">Test MDX</a></Button>

      </div>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Skeleton Test</h2>
        <SkeletonWrapper
          palette={palette}
          isLoading={isLoading}
          skeleton={undefined}
          className=""
          style={{}}
        >
          <p>This is some text that will be replaced with skeleton when loading.</p>
          <h3>A Heading</h3>
          <div>Some other content</div>
        </SkeletonWrapper>
      </div>

      <AnimatedModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        modalId="modal-test"
        palette={palette}
        animationConfig={{}}
      >
        <h2 className="text-2xl font-semibold mb-4">Hello from Modal!</h2>
      </AnimatedModal>
    </div>
  );
}
