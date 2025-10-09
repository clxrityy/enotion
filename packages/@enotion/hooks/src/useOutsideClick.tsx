import { useRef, useEffect, RefObject } from "react";

export interface UseOutsideClickOptions {
  ref: RefObject<HTMLElement | Element | null>;
  callback: (event: MouseEvent | TouchEvent) => void;
}

/**
 *
 * @param ref - RefObject pointing to the element to detect outside clicks for
 * @param callback - Callback function to be invoked when an outside click is detected
 * @description
 * The `useOutsideClick` hook is a custom React hook that detects clicks outside of a specified element.
 * It takes a ref to the target element and a callback function to be executed when an outside click is detected.
 * The hook listens for 'mousedown' and 'touchstart' events on the document and checks if the click occurred outside the referenced element.
 * If so, it invokes the provided callback function.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const ref = useRef(null);
 *   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
 *     console.log('Clicked outside:', event);
 *   };
 *   useOutsideClick({ ref, callback: handleClickOutside });
 * }
 * ```
 */
export function useOutsideClick({
  ref,
  callback,
}: UseOutsideClickOptions): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    }

    // Add event listeners to document
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref]);
}
