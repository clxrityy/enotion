"use client";
import { SkeletonWrapper } from "@enotion/components";
import { useColorPalette } from "@enotion/hooks";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("./content.mdx"), {
  ssr: false
});

export default function Page() {

  const { palette } = useColorPalette();

  return (
    <div className="flex flex-col gap-4 mx-10 overflow-y-scroll w-full h-full">
      <SkeletonWrapper palette={palette} isLoading={true}>
        <MDXProvider>
          <Content />
        </MDXProvider>
      </SkeletonWrapper>
    </div>
  );
}
