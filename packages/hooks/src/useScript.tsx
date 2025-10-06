import { type ComponentProps, useEffect, useState } from "react";

/**
 * ScriptType - The type attribute for the script element.
 * It defines the scripting language of the element's content and how it should be processed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type MDN Web Docs - type attribute}
 */
export type ScriptType =
  | "importmap"
  | "module"
  | "speculationrules"
  | "text/javascript"
  | "application/javascript"
  | "application/ecmascript"
  | "module-shim";

/**
 * UseScriptOptions - Options for configuring the useScript hook.
 * @property async - Whether to load the script asynchronously. Default is true.
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async MDN Web Docs - async attribute}
 * @property defer - Whether to load the script with defer attribute. Default is false.
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer MDN Web Docs - defer attribute}
 * @property type - The type of the script.
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type MDN Web Docs - type attribute}
 * @property position - The position to insert the script in the document. Can be "head" or "body". Default is "head".
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#placement_in_documents MDN Web Docs - Placement in documents}
 * @property onLoad - A callback function to be called when the script is loaded.
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#event-onload MDN Web Docs - onload event}
 * @property onError - A callback function to be called if an error occurs while loading the script.
 * - {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#event-onerror MDN Web Docs - onerror event}
 */
export interface UseScriptOptions
  extends Omit<ComponentProps<"script">, "onError"> {
  /** Whether to load the script asynchronously */
  async?: boolean;
  /** Whether to load the script with defer attribute */
  defer?: boolean;
  /** The type of the script */
  type?: ScriptType;
  /** The position to insert the script in the document */
  position?: "head" | "body";
  attributionSrc?: string;
  /** A callback function to be called when the script is loaded */
  onLoad?: () => void;
  /** A callback function to be called if an error occurs while loading the script */
  onError?: (error: ErrorEvent) => void;
}

/**
 * useScript - A React hook for dynamically loading external scripts.
 *
 * @param src - The source URL of the script to load.
 * @param options - Optional configuration options for loading the script.
 * @returns A boolean indicating whether the script has been successfully loaded.
 *
 * @description
 * The `useScript` hook allows you to dynamically load external JavaScript files into your React application.
 * It manages the script's loading state and provides options for customization, such as async loading,
 * defer attribute, and callback functions for load and error events.
 *
 * @example
 * ```tsx
 * const isLoaded = useScript("https://example.com/script.js", {
 *   async: true,
 *   onLoad: () => console.log("Script loaded!"),
 *   onError: (error) => console.error("Error loading script:", error),
 * });
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script MDN Web Docs - &lt;script&gt; element}
 * @module useScript
 */
export function useScript(
  src: string,
  options: UseScriptOptions = {},
): boolean {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      return;
    }

    const {
      async = true,
      defer = false,
      type,
      position = "head",
      onLoad,
      onError,
      attributionSrc,
    } = options;

    let script = document.querySelector(
      `script[src="${src}"]`,
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.defer = defer;

      if (type) {
        script.type = type;
      }
      if (attributionSrc) {
        script.setAttribute("data-attribution-src", attributionSrc);
      }
      script.setAttribute("data-loaded", "false");
      const parent = position === "head" ? document.head : document.body;
      parent.appendChild(script);
    } else if (script.getAttribute("data-loaded") === "true") {
      setLoaded(true);
      return;
    }

    const handleLoad = () => {
      script?.setAttribute("data-loaded", "true");
      setLoaded(true);
      onLoad?.();
    };

    const handleError = (error: ErrorEvent) => {
      script?.remove();
      setLoaded(false);
      onError?.(error);
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    };
  }, [src, options]);

  return loaded;
}
