import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import {
  adjustHexColorOpacity,
  blendHexColors,
  cn,
  darkenHexColor,
} from "@enotion/core/utils";
import { HTMLAttributes, JSX, ReactNode } from "react";
import { randomUUID } from "node:crypto";
import "./styles/layout-container.css";

/**
 * Props for the LayoutContainer component.
 * @interface LayoutContainerProps
 * @extends HTMLAttributes<HTMLDivElement>
 * @property `renderChildren` {@link ReactNode} - The child elements to be rendered inside the container.
 * @property `colorPalette` {@link ColorPaletteType}  - Optional color palette for styling.
 */
export interface LayoutContainerProps extends HTMLAttributes<HTMLDivElement> {
  colorPalette?: ColorPaletteType;
  renderChildren: (() => ReactNode[] | ReactNode) | ReactNode;
}

/**
 * LayoutContainer component that applies a color palette and styles to its children.
 * @param {LayoutContainerProps} props - The props for the component.
 * @param {(() => ReactNode[] | ReactNode) | ReactNode} props.renderChildren - The child elements or a function returning them.
 * @param {ColorPaletteType} [props.colorPalette] {@link ColorPaletteType} - Optional color palette for styling. If passed, it will be applied to the container and passed down to children that accept the `colorPalette` prop.
 *
 * @description This component wraps its children in a styled div, applying background and foreground colors based on the provided color palette. It also enhances child components by passing down the color palette as a prop.
 * Works with both direct children and children returned from a function.
 */
export const LayoutContainer = ({
  renderChildren,
  colorPalette,
  ...props
}: LayoutContainerProps): JSX.Element => {
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  const darkenedBoxShadow = adjustHexColorOpacity(
    darkenHexColor(palette?.muted || "#000000", 20) || "#00000099",
    0.2,
  );

  const mapPropsIntoChildren = () => {
    if (typeof renderChildren === "function") {
      const children = renderChildren();
      if (Array.isArray(children)) {
        return children.map((child) => {
          if (typeof child === "object" && child !== null && "props" in child) {
            const rest = child.props as { [key: string]: any };

            const childProps = {
              ...rest,
              colorPalette: colorPalette,
              key: randomUUID(),
            };

            return {
              ...child,
              props: {
                ...childProps,
              },
            };
          }
          return child;
        });
      } else if (
        typeof children === "object" &&
        children !== null &&
        "props" in children
      ) {
        const rest = children.props as { [key: string]: any };
        const childProps = { ...rest, colorPalette: colorPalette };

        return {
          ...children,
          props: {
            ...childProps,
          },
        };
      }
      return children;
    }
    return renderChildren;
  };

  const blendedColorTop = blendHexColors(
    palette?.background!,
    palette?.border!,
    0.5,
  );
  const blendedColorBottom = blendHexColors(
    palette?.background!,
    palette?.border!,
    0.8,
  );

  return (
    <div
      {...props}
      className={cn("layout-container", props.className)}
      style={{
        backgroundColor: palette
          ? `linear-gradient(to bottom, ${blendedColorTop}, ${blendedColorBottom})`
          : undefined,
        color: palette?.foreground,
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: `0 4px 6px ${darkenedBoxShadow}`,
        ...props.style,
      }}
    >
      {mapPropsIntoChildren()}
    </div>
  );
};
