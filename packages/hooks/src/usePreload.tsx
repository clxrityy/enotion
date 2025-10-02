import { useState, useRef, useCallback, MouseEventHandler } from "react";

/**
 *
 * @param callback A function that returns a promise to be executed on hover.
 * @returns An object containing the onMouseOverCapture event handler to trigger the preload.
 *
 * @description
 * The `usePreload` hook is designed to facilitate preloading of resources or data when a user hovers over a specific element.
 * It accepts a callback function that returns a promise, which is executed when the user hovers over the element for the first time.
 * The hook ensures that the preload action is only triggered once, preventing redundant calls.
 * It returns an object with an `onMouseOverCapture` event handler that can be attached to any HTML element.
 * Once the preload is complete, the event handler is removed to avoid further unnecessary executions.
 *
 * @example
 * ```tsx
 * const importComponent = () => import('./Component');
 *
 * const MyComponent = () => {
 *  const preloadedComponent = usePreload(importComponent);
 *
 *  return <div {...preloadedComponent}>Hover me to preload!</div>;
 * }
 * ```
 */
export const usePreload = (
  callback: () => Promise<unknown>,
): {
  onMouseOverCapture?: MouseEventHandler<HTMLElement>;
} => {
  const [preloaded, setPreloaded] = useState<boolean>(false);
  const initializedPreload = useRef<boolean>(false);

  const preload = useCallback((): void => {
    if (initializedPreload.current) return;

    initializedPreload.current = true;

    callback().then(() => setPreloaded(true));
  }, [callback]);

  return preloaded ? {} : { onMouseOverCapture: preload };
};
