// parseChildren.ts
// Pass in children and a callback to process each child node
import {
  ReactNode,
  isValidElement,
  cloneElement,
  Children,
  ComponentProps,
} from "react";

/**
 * Recursively parses React children and applies a callback to each child node.
 *
 * @param children - The ReactNode children to parse.
 * @param callback - A function that takes a ReactNode and returns a processed ReactNode.
 * @returns A new ReactNode with the callback applied to each child.
 */
export const parseChildren = (
  children: ReactNode,
  callback: (child: ReactNode) => ReactNode,
): ReactNode => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && (child.props as { children?: ReactNode }).children) {
      // Recursively parse nested children
      const parsedNestedChildren = parseChildren(
        (child.props as { children?: ReactNode }).children,
        callback,
      );
      const clonedChild = cloneElement(child, {
        ...child.props as ComponentProps<any>,
        children: parsedNestedChildren,
      });
      return callback(clonedChild);
    }
    return callback(child);
  });
};
