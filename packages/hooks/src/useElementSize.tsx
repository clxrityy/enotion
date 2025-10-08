import { RefObject, useEffect, useState } from "react";

/**
 *
 * @param ref - RefObject pointing to the element to measure
 * @description
 * The `useElementSize` hook is a custom React hook that measures the size of a referenced HTML element.
 * It takes a ref to the target element and returns an object containing the width, height, and borderRadius of the element.
 * The hook uses the ResizeObserver API to listen for size changes and updates the measurements accordingly.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const ref = useRef(null);
 *   const size = useElementSize(ref);
 *   return <div ref={ref}>Width: {size.width}, Height: {size.height}</div>;
 * }
 * ```
 * @returns An object containing the width, height, and borderRadius of the referenced element.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<{ width: number; height: number, borderRadius: string }>({ width: 0, height: 0, borderRadius: "0px" });

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
          borderRadius: getComputedStyle(ref.current).borderRadius,
        });
      }
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
