import {
  ComponentPropsWithoutRef,
  ReactNode,
  useRef,
  cloneElement,
  isValidElement,
  Children,
} from "react";
import { useElementSize } from "@enotion/hooks";
import "./skeleton.css";

export interface SkeletonWrapperProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Whether the skeleton is in loading state.
   * When true, shows skeleton placeholders. When false, shows children.
   */
  isLoading: boolean;
  /**
   * The children to wrap and measure for skeleton sizing.
   */
  children: ReactNode;
  /**
   * Optional custom skeleton element(s) to show during loading.
   * If not provided, will clone and style the children as skeletons.
   */
  skeleton?: ReactNode;
  /**
   * Custom class name for skeleton elements.
   */
  skeletonClassName?: string;
  /**
   * Whether to animate the skeleton (e.g., pulse, shimmer).
   * @default true
   */
  animate?: boolean;
}

/**
 * A Skeleton wrapper component that measures its children and displays
 * skeleton placeholders with the same dimensions during loading states.
 *
 * @example
 * Basic usage with automatic skeleton generation:
 * ```tsx
 * <SkeletonWrapper isLoading={isLoading}>
 *   <div className="card">
 *     <h2>Title</h2>
 *     <p>Description text</p>
 *   </div>
 * </SkeletonWrapper>
 * ```
 *
 * @example
 * With custom skeleton:
 * ```tsx
 * <SkeletonWrapper
 *   isLoading={isLoading}
 *   skeleton={<div className="custom-skeleton" />}
 * >
 *   <UserProfile />
 * </SkeletonWrapper>
 * ```
 *
 * @example
 * Multiple children with preserved layout:
 * ```tsx
 * <SkeletonWrapper isLoading={isLoading}>
 *   <h1>Title</h1>
 *   <p>Paragraph 1</p>
 *   <p>Paragraph 2</p>
 * </SkeletonWrapper>
 * ```
 */
export function SkeletonWrapper({
  isLoading,
  children,
  skeleton,
  skeletonClassName = "skeleton",
  animate = true,
  className,
  style,
  ...rest
}: Readonly<SkeletonWrapperProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isLoading) {
    return (
      <div ref={containerRef} className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  // If custom skeleton provided, use it
  if (skeleton) {
    return (
      <div
        className={className}
        style={style}
        {...rest}
        aria-busy="true"
        aria-live="polite"
      >
        {skeleton}
      </div>
    );
  }

  // Auto-generate skeleton from children
  const renderSkeletonFromChild = (
    child: ReactNode,
    index: number,
  ): ReactNode => {
    if (!isValidElement(child)) {
      // For text nodes, create a simple skeleton span
      return (
        <span
          key={index}
          className={`${skeletonClassName}${animate ? " skeleton-animate" : ""}`}
          style={{
            display: "inline-block",
            width: "100%",
            height: "1em",
            borderRadius: "4px",
          }}
        />
      );
    }

    // Clone the element and apply skeleton styles
    const originalClassName = (child.props as any).className || "";
    const skeletonClass = `${originalClassName} ${skeletonClassName}${animate ? " skeleton-animate" : ""
      }`.trim();

    // Recursively process children
    const processedChildren = (child.props as any).children
      ? Children.map(
        (child.props as any).children,
        (nestedChild: ReactNode, nestedIndex: number) =>
          renderSkeletonFromChild(nestedChild, nestedIndex),
      )
      : undefined;

    return cloneElement(child as any, {
      key: index,
      className: skeletonClass,
      "aria-busy": "true",
      children: processedChildren,
    });
  };

  const skeletonContent = Children.map(children, (child, index) =>
    renderSkeletonFromChild(child, index),
  );

  return (
    <div
      className={className}
      style={style}
      {...rest}
      aria-busy="true"
      aria-live="polite"
    >
      {skeletonContent}
    </div>
  );
}

SkeletonWrapper.displayName = "SkeletonWrapper";

/**
 * A simple Skeleton element component for standalone skeleton placeholders.
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={40} />
 * ```
 *
 * @example
 * With reference element sizing:
 * ```tsx
 * const ref = useRef(null);
 * return (
 *   <>
 *     <div ref={ref}>Content</div>
 *     <Skeleton referenceElement={ref} />
 *   </>
 * );
 * ```
 */
export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Width of the skeleton. Can be a number (px) or string (e.g., "100%").
   */
  width?: number | string;
  /**
   * Height of the skeleton. Can be a number (px) or string (e.g., "2em").
   */
  height?: number | string;
  /**
   * Border radius of the skeleton.
   */
  borderRadius?: number | string;
  /**
   * Reference element to inherit size from.
   */
  referenceElement?: React.RefObject<HTMLElement | null>;
  /**
   * Whether to animate the skeleton.
   * @default true
   */
  animate?: boolean;
}

export function Skeleton({
  width,
  height,
  borderRadius = "4px",
  referenceElement,
  animate = true,
  className,
  style,
  ...rest
}: Readonly<SkeletonProps>) {
  const size = useElementSize(referenceElement ?? { current: null });

  const skeletonStyle: React.CSSProperties = {
    width: referenceElement ? size.width : width || "100%",
    height: referenceElement ? size.height : height || "1em",
    borderRadius: referenceElement ? size.borderRadius : borderRadius,
    ...style,
  };

  const combinedClassName = [
    "skeleton",
    animate ? "skeleton-animate" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={combinedClassName}
      style={skeletonStyle}
      aria-busy="true"
      aria-live="polite"
      {...rest}
    />
  );
}

Skeleton.displayName = "Skeleton";
