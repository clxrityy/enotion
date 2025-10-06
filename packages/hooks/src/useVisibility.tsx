import { useRef, useState, useEffect, RefObject } from "react";

/**
 * Options for the useVisibility hook.
 * @property elementRef - A reference to the DOM element to be observed.
 * @property parentSelector - An optional CSS selector string or RefObject for the parent element to use as the root for intersection observation.
 * @property intersectionOptions - Optional IntersectionObserverInit options to customize the observer's behavior.
 * @property alwaysVisible - If true, the hook will always return true, bypassing intersection observation.
 */
export interface UseVisibilityOptions {
  elementRef: RefObject<HTMLElement | null>;
  parentSelector?: string | RefObject<HTMLElement | null>;
  intersectionOptions?: IntersectionObserverInit;
  alwaysVisible?: boolean;
}

/**
 * useVisibility - A React hook to determine if an element is visible within the viewport or a specified parent element.
 * @param options - Configuration options for the hook.
 * @returns A boolean indicating whether the element is visible.
 *
 * @description
 * The `useVisibility` hook utilizes the Intersection Observer API to monitor the visibility of a specified DOM element.
 * It accepts a reference to the target element, an optional parent selector or reference to define the observation root,
 * intersection observer options, and a flag to always consider the element as visible.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import { useVisibility } from './useVisibility';
 *
 * const MyComponent = () => {
 *   const myRef = useRef(null);
 *   const isVisible = useVisibility({ elementRef: myRef });
 *
 *   return (
 *     <div ref={myRef}>
 *       {isVisible ? 'I am visible' : 'I am not visible'}
 *     </div>
 *   );
 * };
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API|MDN Documentation - Intersection Observer API}
 * @module useVisibility
 */
export function useVisibility({
  elementRef,
  parentSelector,
  intersectionOptions = {
    rootMargin: "3px",
    threshold: 0,
  },
  alwaysVisible = false,
}: UseVisibilityOptions): boolean {
  const watching = useRef(false);
  const [isVisible, setIsVisible] = useState<boolean>(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible || !elementRef.current || watching.current) return;
    watching.current = true;

    new IntersectionObserver(
      (entries) =>
        entries.forEach(({ isIntersecting }) => setIsVisible(isIntersecting)),
      {
        root:
          (typeof parentSelector === "object" && parentSelector.current) ||
          (typeof parentSelector === "string" &&
            elementRef.current.closest(parentSelector)) ||
          elementRef.current.parentElement,
        ...intersectionOptions,
      },
    ).observe(elementRef.current);
  }, [alwaysVisible, elementRef, parentSelector, intersectionOptions]);

  return isVisible;
}
