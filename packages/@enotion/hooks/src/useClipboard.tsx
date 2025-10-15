import { useEffect, useState } from "react";

export interface UseClipboardProps {
  onCopy?: (text: string) => void;
  onError?: (error: Error) => void;
}

/**
 *
 * @param onCopy Optional callback function invoked after a successful copy operation
 * @param onError Optional callback function invoked if an error occurs during the copy operation
 * @description
 * The `useClipboard` hook is a custom React hook that provides functionality to copy text to the clipboard.
 * It returns an object containing a boolean `isCopied` indicating whether the last copy operation was successful,
 * a `copy` function that takes a string argument to be copied to the clipboard, and the `clipboard` object if available.
 * The hook uses the modern Clipboard API and handles success and error states.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isCopied, copy } = useClipboard({
 *     onCopy: (text) => console.log(`Copied: ${text}`),
 *     onError: (error) => console.error(`Copy failed: ${error.message}`),
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={() => copy("Hello, World!")}>
 *         {isCopied ? "Copied!" : "Copy Text"}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API|Clipboard API}
 *
 * @module useClipboard
 */
export const useClipboard = ({ onCopy, onError }: UseClipboardProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      const error = new Error("Clipboard API not supported");
      setIsCopied(false);
      if (onError) onError(error);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      if (onCopy) onCopy(text);
    } catch (err) {
      setIsCopied(false);
      if (onError) onError(err as Error);
      return;
    }
  };

  const [clipboard, setClipboard] = useState<Clipboard | null>(null);

  useEffect(() => {
    if (navigator.clipboard) {
      setClipboard(navigator.clipboard);
    }

    return () => setClipboard(null);
  }, []);

  return { isCopied, copy, clipboard };
};
