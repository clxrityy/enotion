import { useEffect, useRef } from "react";

/** EventName type representing valid event names for event listeners */
export type EventName = keyof GlobalEventHandlersEventMap;

/** EventType union type representing various event types */
export type EventType = Omit<
  | Event
  | MouseEvent
  | TouchEvent
  | KeyboardEvent
  | FocusEvent
  | UIEvent
  | PointerEvent
  | WheelEvent
  | AnimationEvent
  | TransitionEvent
  | CompositionEvent
  | InputEvent
  | DragEvent
  | ClipboardEvent
  | MediaQueryListEvent
  | MessageEvent
  | PopStateEvent
  | StorageEvent
  | HashChangeEvent
  | ProgressEvent
  | ErrorEvent,
  never
>;

/** * useEventListener hook
 *
 * @param eventName - Name of the event to listen for (e.g., 'click', 'resize')
 * @param handler - Callback function to handle the event
 * @param element - The target element to attach the event listener to (default is window)
 * @param options - Optional options for addEventListener (e.g., capture, once, passive)
 *
 * @description
 * The `useEventListener` hook is a custom React hook that simplifies the process of adding and removing event listeners to DOM elements.
 * It takes an event name, a handler function, an optional target element (defaulting to `window`), and optional options for the event listener.
 * The hook ensures that the event listener is properly added when the component mounts and removed when it unmounts or when dependencies change.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const handleResize = (event: Event) => {
 *    console.log('Window resized:', event);
 *   };
 *  useEventListener('resize', handleResize);
 * }
 * ```
 *
 * @see {@link https://reactjs.org/docs/hooks-effect.html|React useEffect}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener|addEventListener}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener|removeEventListener}
 *
 * @module useEventListener
 */
export function useEventListener(
  eventName: EventName,
  handler: (event: EventType) => void,
  element: HTMLElement | Window | Document = globalThis.window,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: EventType) => void>(handler);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element?.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    // Add event listener
    element.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
