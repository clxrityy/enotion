"use client";

import { Card, CodeBlock, CopyButton } from "@enotion/components";
import {
  adjustHexColorOpacity,
  ColorPalettes,
  type DocPackage,
} from "@enotion/core";
import { useColorPalette } from "@enotion/hooks";
import { useNotify } from "@enotion/notify";
import { CSSProperties } from "react";

export function PackageOverview({ package: pkg }: { package: DocPackage }) {
  const { palette } = useColorPalette();
  const { success } = useNotify();

  const colors = palette ? ColorPalettes[palette] : null;
  const content = `npm install ${pkg.name}`;

  return (
    <div
      style={
        {
          "--background": colors?.background,
          "--foreground": colors?.foreground,
          "--border": colors?.border,
          "--foreground-accent": adjustHexColorOpacity(
            colors?.foreground || "",
            0.5,
          ),
        } as CSSProperties
      }
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{pkg.name}</h1>
        <p className="text-lg text-(--foreground-accent)">{pkg.description}</p>
      </div>

      {/* Installation */}
      <Card palette={palette}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="relative flex flex-row items-center gap-3">
            <CodeBlock palette={palette} language="bash">
              {content}
            </CodeBlock>
            <CopyButton
              content={content}
              palette={palette}
              onCopied={(_) => {
                success("Copied!");
              }}
            />
          </div>
        </div>
      </Card>

      {/* Modules / Links */}
      <div className="block">
        <h2 className="text-2xl font-semibold mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-8">
          {pkg.modules.map((mod) => (
            <Card key={mod.slug}>
              <a
                href={`/packages/${pkg.slug}/${mod.slug}`}
                className="px-4 py-6 hover:shadow-lg transition-shadow w-full block rounded-lg"
              >
                <h3 className="text-xl font-medium mb-2">{mod.name}</h3>
                <p className="text-(--foreground-accent)">{mod.description}</p>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
