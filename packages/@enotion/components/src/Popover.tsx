import { useState, useRef, ReactNode, HTMLAttributes, CSSProperties } from "react";
import "./styles/popover.css";
import { useOutsideClick, useVisibility } from "@enotion/hooks";
import { cn } from "@enotion/core/utils";
import { adjustHexColorOpacity, ColorPalettes, ColorPaletteType } from "@enotion/core";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  popoverContent: ReactNode;
  colorPalette?: ColorPaletteType;
}

/**
 * Popover component that displays content in a floating container when triggered.
 * @param {PopoverProps} props - The props for the Popover component.
 * @param {ReactNode} props.children - The trigger element that toggles the popover.
 * @param {ReactNode} props.popoverContent - The content to be displayed inside the popover.
 * @param {ColorPaletteType} [props.colorPalette] {@link ColorPaletteType} - Optional color palette for styling.
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
export const Popover = ({ children, popoverContent, colorPalette, ...props }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(useVisibility({ elementRef: popoverRef }));

  useOutsideClick({
    ref: popoverRef,
    callback(event) {
      if (popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(false); // Close popover when clicking outside
      }
    },
  });

  const palette = colorPalette && ColorPalettes[colorPalette];

  return (
    <div className={cn("enotion-popover-container", props.className)} {...props}>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsVisible((prev) => !prev)}
        className="enotion-popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="enotion-popover-content"
        style={{
          backgroundColor: palette ? palette.background : undefined,
          color: palette ? palette.foreground : "inherit",
        }}
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="enotion-popover-content"
          ref={popoverRef}
          className="enotion-popover-content"
          role="dialog"
          aria-modal="true"
          style={{
            "--popover-content-border": palette ? palette.border : undefined,
            "--popover-content-box-shadow": palette ? adjustHexColorOpacity(palette.accent, 0.1) : undefined,
            backgroundColor: palette ? palette.muted : undefined,
          } as CSSProperties}
        >
          {popoverContent}
        </div>
      )}
    </div>
  );
}
