"use client";

import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

export function MDXContent({
  pkg,
  mod
}: {
  pkg: string;
  mod: string;
}) {
  const Content = dynamic(() => import(`@/content/docs/${pkg}/${mod}.mdx`).then((mod) => mod.default), {
    ssr: false
  });

  return <MDXProvider>
    <Content />
  </MDXProvider>;
}
