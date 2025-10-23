import {
  useState,
  useRef,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
} from "react";
import "./styles/popover.css";
import { useOutsideClick } from "@enotion/hooks";
import { blendHexColors, cn } from "@enotion/core/utils";
import {
  adjustHexColorOpacity,
  ColorPalettes,
  ColorPaletteType,
} from "@enotion/core";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  popoverContent: ReactNode;
  palette?: ColorPaletteType;
}

/**
 * Popover component that displays content in a floating container when triggered.
 * @param {PopoverProps} props - The props for the Popover component.
 * @param {ReactNode} props.children - The trigger element that toggles the popover.
 * @param {ReactNode} props.popoverContent - The content to be displayed inside the popover.
 * @param {ColorPaletteType} [props.palette] {@link ColorPaletteType} - Optional color palette for styling.
 *
 * @description The Popover component provides a button that, when clicked, shows or hides a floating container with specified content.
 * It also handles outside clicks to close the popover when clicking outside of it.
 *
 * @example
 * ```tsx
 * <Popover popoverContent={<div>This is the popover content</div>} colorPalette="dark">
 *   <span>Click me to toggle popover</span>
 * </Popover>
 * ```
 */
export const Popover = ({
  children,
  popoverContent,
  palette,
  ...props
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useOutsideClick({
    ref: popoverRef,
    callback(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(false); // Close popover when clicking outside
      }
    },
  });

  const color = palette && ColorPalettes[palette];

  return (
    <div
      className={cn("enotion-popover-container", props.className)}
      {...props}
    >
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsVisible((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && isVisible) {
            setIsVisible(false);
          }
        }}
        className="enotion-popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="enotion-popover-content"
        style={{
          color: color ? color.foreground : "inherit",
        }}
      >
        {children}
      </button>
      {isVisible && (
        <div
          ref={popoverRef}
          className="enotion-popover-content"
          role="dialog"
          aria-modal="false"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsVisible(false);
              triggerRef.current?.focus();
            }
          }}
          style={
            {
              "--popover-content-border": color
                ? adjustHexColorOpacity(color.border, 0.25)
                : undefined,
              "--popover-content-box-shadow": color
                ? adjustHexColorOpacity(color.muted, 0.1)
                : undefined,
              color: color ? color.foreground : "inherit",
              backgroundColor: color
                ? blendHexColors(color.background, color.muted, 0.33)
                : "inherit",
              borderRadius: "0.5rem",
              padding: "0.5rem",
            } as CSSProperties
          }
        >
          {popoverContent}
        </div>
      )}
    </div>
  );
};
