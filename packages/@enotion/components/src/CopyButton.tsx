import { ButtonHTMLAttributes } from "react";
import { useClipboard } from "@enotion/hooks";
import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core/constants";

/**
 * @description Props for the CopyButton component.
 * @interface CopyButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property `onCopy()` - Callback function invoked after a successful copy action.
 */
export interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onCopied?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  content: string;
  colorPalette?: ColorPaletteType;
}

export const CopyButton = ({
  onCopied,
  onCopyError,
  content,
  colorPalette,
  ...props
}: CopyButtonProps) => {
  const { isCopied, copy } = useClipboard({ onError: onCopyError });

  const Icon = isCopied ? Icons.Copied : Icons.Copy;
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  return (
    <button
      onClick={() => {
        copy(content);
        if (onCopied) {
          onCopied(content);
        }
      }}
      style={{
        backgroundColor: palette ? palette.background : undefined,
        color: palette ? palette.foreground : undefined,
        border: palette ? `1px solid ${palette.border}` : undefined,
        padding: "0.25rem",
        borderRadius: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
        ...(props.style || {}),
      }}
      type="button"
      title="copy"
      aria-label="copy"
      {...props}
    >
      <Icon />
    </button>
  )
}
