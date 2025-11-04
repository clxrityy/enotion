"use client";
import { SkeletonWrapper } from "@enotion/components";
import { useColorPalette } from "@enotion/hooks";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import { useMDXComponents } from "@/mdx-components";

const Content = dynamic(() => import("./content.mdx"), {
  ssr: false,
});

export default function Page() {
  const { palette } = useColorPalette();
  const components = useMDXComponents({});

  return (
    <div className="flex flex-col gap-4 mx-4 overflow-y-scroll w-full h-full">
      <SkeletonWrapper palette={palette} isLoading={true}>
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </SkeletonWrapper>
    </div>
  );
}
