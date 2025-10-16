import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import {
  adjustHexColorOpacity,
  blendHexColors,
  cn,
  darkenHexColor,
  lightenHexColor,
} from "@enotion/core/utils";
import {
  HTMLAttributes,
  JSX,
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
  CSSProperties,
} from "react";
import "./styles/layout-container.css";
import { Theme } from "@enotion/hooks";

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
  theme?: Theme;
}

/**
 * LayoutContainer component that applies a color palette and styles to its children.
 * @param {LayoutContainerProps} props - The props for the component.
 * @param {(() => ReactNode[] | ReactNode) | ReactNode} props.renderChildren - The child elements or a function returning them.
 * @param {ColorPaletteType} [props.colorPalette] {@link ColorPaletteType} - Optional color palette for styling. When provided, it will be **automatically injected** into all children and nested children that can accept the `colorPalette` prop.
 *
 * @description This component wraps its children in a styled div, applying background and foreground colors based on the provided color palette.
 * It **recursively traverses all children** and automatically passes the `colorPalette` prop to any component that can accept it,
 * eliminating the need to manually specify the palette on each child component.
 *
 * **Features:**
 * - Automatic recursive prop injection to all descendants
 * - Respects explicitly set `colorPalette` props (no override)
 * - Works with both direct children and children returned from a function
 * - Handles arrays, fragments, and deeply nested components
 *
 * @example
 * ```tsx
 * // All children automatically receive colorPalette="solarized"
 * <LayoutContainer colorPalette="solarized" renderChildren={
 *   <div>
 *     <Button /> // Gets colorPalette automatically
 *     <Card>
 *       <Text /> // Even nested children get it
 *     </Card>
 *   </div>
 * } />
 * ```
 */
export const LayoutContainer = ({
  renderChildren,
  colorPalette,
  theme,
  ...props
}: LayoutContainerProps): JSX.Element => {
  const defaultPalette = theme === "dark" ? ColorPalettes.dark : ColorPalettes.default;
  const palette = colorPalette ? ColorPalettes[colorPalette] : defaultPalette;

  const darkenedBoxShadow = adjustHexColorOpacity(
    darkenHexColor(palette?.muted || "#000000", 20) || "#00000099",
    0.2,
  );

  /**
   * Recursively clones children and injects the colorPalette prop into all components that can accept it.
   * @param children - The children to process
   * @returns The cloned children with colorPalette injected
   */
  const injectColorPalette = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      // Only process valid React elements
      if (!isValidElement(child)) {
        return child;
      }

      // Type assertion for child props
      const existingProps = child.props as Record<string, any>;

      // Clone the element and inject colorPalette if it doesn't already have one
      const childProps: Record<string, any> = {};

      // Only inject colorPalette into custom components (not native DOM elements like div, span, etc.)
      // Native DOM elements have string types (e.g., "div"), custom components have function/object types
      const isCustomComponent = typeof child.type !== "string";

      if (colorPalette && !existingProps.colorPalette && isCustomComponent) {
        childProps.colorPalette = colorPalette;
      }

      // Recursively process nested children (for both custom components and DOM elements)
      if (existingProps.children) {
        childProps.children = injectColorPalette(existingProps.children);
      }

      // Clone the element with the new props
      return cloneElement(child, childProps);
    });
  };

  const processedChildren =
    typeof renderChildren === "function"
      ? injectColorPalette(renderChildren())
      : injectColorPalette(renderChildren);

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
        "--layout-background": palette ? palette.background : undefined,
        "--layout-foreground": palette ? palette.foreground : undefined,
        "--layout-border": palette ? lightenHexColor(palette.border, 0.4) : undefined,
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: `0 4px 6px ${darkenedBoxShadow}`,
        ...props.style,
      } as CSSProperties}
    >
      <div className={`layout-container-inner`}>{processedChildren}</div>
    </div>
  );
};
