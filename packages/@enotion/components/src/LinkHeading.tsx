import { cn, ColorPaletteType, Icons } from "@enotion/core";
import { JSX, ReactNode } from "react";
import { Link } from "./Link.js";

export interface LinkHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  palette?: ColorPaletteType;
  className?: string;
}


export function LinkHeading({
  level,
  children,
  palette,
  className,
}: LinkHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Link palette={palette} href={`#${typeof children === "string" ? children.toLowerCase().replaceAll(/\s+/g, "-") : ""}`}>
      <Tag className={cn(
        "group flex items-center gap-2 scroll-mt-20",
        className
      )} id={typeof children === "string" ? children.toLowerCase().replaceAll(/\s+/g, "-") : undefined}>
        <span>
          {children}
        </span>
        <Icons.Hash className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Tag>
    </Link>
  )
}
