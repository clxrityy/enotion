import { ColorPaletteType, Icons } from "@enotion/core";
import { JSX, ReactNode } from "react";
import { Link } from "./Link.js";

export interface LinkHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  palette?: ColorPaletteType;
}


export function LinkHeading({
  level,
  children,
  palette,
}: LinkHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Link palette={palette} href={`#${typeof children === "string" ? children.toLowerCase().replaceAll(/\s+/g, "-") : ""}`}>
      <Tag className="flex items-center gap-2 group">
        <span>
          {children}
        </span>
        <Icons.Hash className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Tag>
    </Link>
  )
}
