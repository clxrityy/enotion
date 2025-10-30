import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to determine if a component is currently mounted.
 * Useful for avoiding state updates on unmounted components.
 * @returns A function that returns true if the component is mounted, false otherwise.
 * @example
 * ```tsx
 * const isMounted = useIsMounted();
 *
 * useEffect(() => {
 *   fetchData().then(data => {
 *     if (isMounted()) {
 *       setState(data);
 *     }
 *   });
 * }, []);
 * ```
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}
