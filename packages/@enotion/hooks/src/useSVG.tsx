// useSVG.tsx
// A custom React hook for loading, rendering, and manipulating SVG files.

import { useState, useEffect, SVGProps } from "react";

export interface UseSVGOptions extends SVGProps<SVGSVGElement> {
  src: string; // URL or path to the SVG file
  strokeColor?: string; // Optional stroke color to apply
  fillColor?: string; // Optional fill color to apply
}

/**
 * A custom React hook to load and manipulate SVG files.

 * @example
 * ```tsx
 * const { svgContent, error, svgProps } = useSVG({
 *   src: '/path/to/icon.svg',
 *   strokeColor: '#ff0000',
 *   fillColor: '#00ff00',
 *   width: 100,
 *   height: 100,
 * });
 * ```
 */
export function useSVG({ src, strokeColor, fillColor, ...svgProps }: UseSVGOptions): {
  svgContent: string | null;
  error: Error | null;
  svgProps: SVGProps<SVGSVGElement>;
} {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSVG() {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`);
        }
        let svgText = await response.text();

        // Apply stroke and fill colors if provided
        if (strokeColor) {
          svgText = svgText.replaceAll(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
        }
        if (fillColor) {
          svgText = svgText.replaceAll(/fill="[^"]*"/g, `fill="${fillColor}"`);
        }

        setSvgContent(svgText);
      } catch (err) {
        setError(err as Error);
      }
    }

    fetchSVG();
  }, [src, strokeColor, fillColor]);

  return { svgContent, error, svgProps };
}
