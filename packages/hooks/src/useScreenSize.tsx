import { useEffect, useLayoutEffect, useState } from 'react';

export interface DefaultScreenSize {
  initialWidth?: number;
  initialHeight?: number;
}

/**
 * A custom React hook that provides the current screen size and device type information.
 * It listens for window resize events and updates the screen size state accordingly.
 *
 * @param {DefaultScreenSize} [defaultSize] - An optional object specifying default width and height for server-side rendering.
 *   - initialWidth: Default width in pixels (default is `1024`).
 *   - initialHeight: Default height in pixels (default is `768`).
 *
 * @return An object containing the current screen width, height, and boolean flags for device types and orientations.
 *
 * @example
 * ```tsx
 * "use client";
 * import { useScreenSize } from '@enotion/hooks';
 *
 * const MyComponent = () => {
 *   const { width, height, isMobile, isTablet, isDesktop, isLargeDesktop, isPortrait, isLandscape } = useScreenSize();
 *
 *   return (
 *     <div>
 *       <p>Width: {width}px</p>
 *       <p>Height: {height}px</p>
 *       <p>Device Type: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : isLargeDesktop ? 'Large Desktop' : 'Unknown'}</p>
 *       <p>Orientation: {isPortrait ? 'Portrait' : isLandscape ? 'Landscape' : 'Unknown'}</p>
 *     </div>
 *   );
 * };
 * ```
 */
export const useScreenSize = (defaultSize?: DefaultScreenSize) => {
  const [screenSize, setScreenSize] = useState<{ width: number; height: number }>({ width: defaultSize?.initialWidth ?? 1024, height: defaultSize?.initialHeight ?? 768 });

  useEffect(() => {
    if (!defaultSize) return;
    if (defaultSize.initialWidth && defaultSize.initialHeight) {
      setScreenSize({ width: defaultSize.initialWidth, height: defaultSize.initialHeight });
    }
  }, []);

  const handleSize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return {
    width: screenSize.width,
    height: screenSize.height,
    isMobile: screenSize.width <= 768,
    isTablet: screenSize.width > 768 && screenSize.width <= 1024,
    isDesktop: screenSize.width > 1024,
    isLargeDesktop: screenSize.width > 1440,
    isPortrait: screenSize.height >= screenSize.width,
    isLandscape: screenSize.width > screenSize.height,
  };
}
