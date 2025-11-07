"use client";

import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import { useMDXComponents } from "@/mdx-components";

export function MDXContent({ pkg, mod }: { pkg: string; mod: string }) {
  const components = useMDXComponents({});
  const Content = dynamic(
    () => import(`@/content/docs/${pkg}/${mod}.mdx`).then((mod) => mod.default),
    {
      ssr: false,
    },
  );

  return (
    <MDXProvider components={components}>
      <div className="w-full h-full flex flex-col gap-1">
        <Content />
      </div>
    </MDXProvider>
  );
}
