import { ButtonHTMLAttributes } from "react";
import { useClipboard } from "@enotion/hooks";
import {
  ColorPalettes,
  ColorPaletteType,
  Icons,
} from "@enotion/core/constants";

/**
 * @description Props for the CopyButton component.
 * @interface CopyButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property `onCopied()` - Callback function invoked after a successful copy action.
 * @property `onCopyError()` - Callback function invoked if an error occurs during the copy action.
 * @property `content` - The text content to be copied to the clipboard.
 * @property `palette` - Optional color palette to style the button.
 */
export interface CopyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onCopied?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  content: string;
  palette?: ColorPaletteType;
}

/**
 * @description A button component that copies specified content to the clipboard when clicked.
 * It provides visual feedback by changing its icon upon a successful copy action.
 * The button can be styled using an optional color palette.
 *
 * @param @see {@link CopyButtonProps} props - Props for the CopyButton component.
 * @example
 * ```tsx
 * import { CopyButton } from '@enotion/components';
 *
 * const MyComponent = () => (
 *   <CopyButton
 *     content="Text to copy"
 *     onCopied={(text) => console.log(`Copied: ${text}`)}
 *     onCopyError={(error) => console.error('Copy failed', error)}
 *     palette="default"
 *   />
 * );
 * ```
 */
export const CopyButton = ({
  onCopied,
  onCopyError,
  content,
  palette,
  ...props
}: CopyButtonProps) => {
  const { isCopied, copy } = useClipboard({ onError: onCopyError });

  const Icon = isCopied ? Icons.Copied : Icons.Copy;
  const color = palette ? ColorPalettes[palette] : null;

  return (
    <button
      onClick={() => {
        copy(content);
        if (onCopied) {
          onCopied(content);
        }
      }}
      style={{
        backgroundColor: color ? color?.background : undefined,
        color: color ? color?.foreground : undefined,
        border: color ? `1px solid ${color?.border}` : undefined,
        padding: "0.25rem",
        borderRadius: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
        ...props.style,
      }}
      type="button"
      title="copy"
      aria-label="copy"
      {...props}
    >
      <Icon />
    </button>
  );
};
