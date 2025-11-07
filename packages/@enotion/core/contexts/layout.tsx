// layout context
// ------------------------------------
// the idea is to have a context that manages layout elements, their visibility, and provides methods to show/hide/toggle them

import { useState, useEffect, type ReactNode, HTMLAttributes } from "react";
import { createContextFactory } from "./createContextFactory";

/**
 * AnimationConfig - Configuration for element animations.
 * @property enter - CSS class or animation name for enter animation.
 * @property exit - CSS class or animation name for exit animation.
 * @property duration - Animation duration in milliseconds.
 */
export interface AnimationConfig {
  enter?: string;
  exit?: string;
  duration?: number;
}

/**
 * LayoutGroup - Configuration for grouping layout elements.
 * @property id - Unique identifier for the group.
 * @property elements - Array of element IDs in this group.
 * @property exclusive - If true, only one element in group can be visible at a time.
 */
export interface LayoutGroup {
  id: string;
  elements: string[];
  exclusive?: boolean;
}

/**
 * ConditionalConfig - Configuration for conditional rendering.
 * @property condition - Function that returns whether element should be visible.
 * @property onConditionChange - Callback when condition result changes.
 */
export interface ConditionalConfig {
  condition: () => boolean;
  onConditionChange?: (visible: boolean) => void;
}

/**
 * LayoutElement - Represents a layout element with its properties.
 * @property id - Unique identifier for the layout element.
 * @property content - The ReactNode content of the layout element.
 * @property visible - Boolean indicating if the element is visible.
 * @property zIndex - Optional z-index for layering.
 * @property position - Optional CSS position property.
 * @property onVisibilityChange - Optional callback when visibility changes.
 * @property render - Optional custom render function for the element.
 * @property animation - Optional animation configuration for enter/exit animations.
 * @property group - Optional group ID for grouping elements together.
 * @property conditional - Optional conditional rendering configuration.
 * @property priority - Optional priority for conflict resolution (higher = more important).
 */
export interface LayoutElement {
  id: string;
  content: ReactNode;
  visible: boolean;
  zIndex?: number;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  onVisibilityChange?: (visible: boolean) => void;
  render?: () => ReactNode;
  animation?: AnimationConfig;
  group?: string;
  conditional?: ConditionalConfig;
  priority?: number;
}

/**
 * LayoutContextState - The context interface for layout management.
 * @property elements - A map of layout elements by their IDs.
 * @property groups - A map of layout groups by their IDs.
 * @property registerElement - A function to register a new layout element.
 * @property unregisterElement - A function to unregister a layout element by ID.
 * @property updateElement - A function to update properties of a layout element by ID.
 * @property showElement - A function to show a layout element by ID.
 * @property hideElement - A function to hide a layout element by ID.
 * @property toggleElement - A function to toggle visibility of a layout element by ID.
 * @property getElementById - A function to retrieve a layout element by ID.
 * @property getVisibleElements - A function to get all currently visible layout elements.
 * @property isElementVisible - A function to check if a layout element is visible by ID.
 * @property createGroup - A function to create a new layout group.
 * @property removeGroup - A function to remove a layout group by ID.
 * @property addElementToGroup - A function to add an element to a group.
 * @property removeElementFromGroup - A function to remove an element from a group.
 * @property showGroup - A function to show all elements in a group.
 * @property hideGroup - A function to hide all elements in a group.
 * @property evaluateConditionals - A function to evaluate all conditional elements.
 */
export interface LayoutContextState {
  elements: Map<string, LayoutElement>;
  groups: Map<string, LayoutGroup>;
  registerElement: (element: Omit<LayoutElement, "visible">) => void;
  unregisterElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<LayoutElement>) => void;
  showElement: (id: string) => void;
  hideElement: (id: string) => void;
  toggleElement: (id: string) => void;
  getElementById: (id: string) => LayoutElement | undefined;
  getVisibleElements: () => LayoutElement[];
  isElementVisible: (id: string) => boolean;
  createGroup: (group: LayoutGroup) => void;
  removeGroup: (id: string) => void;
  addElementToGroup: (elementId: string, groupId: string) => void;
  removeElementFromGroup: (elementId: string, groupId: string) => void;
  showGroup: (groupId: string) => void;
  hideGroup: (groupId: string) => void;
  evaluateConditionals: () => void;
}

export const initialLayoutContextState: LayoutContextState = {
  elements: new Map(),
  groups: new Map(),
  registerElement: () => {},
  unregisterElement: () => {},
  updateElement: () => {},
  showElement: () => {},
  hideElement: () => {},
  toggleElement: () => {},
  getElementById: () => undefined,
  getVisibleElements: () => [],
  isElementVisible: () => false,
  createGroup: () => {},
  removeGroup: () => {},
  addElementToGroup: () => {},
  removeElementFromGroup: () => {},
  showGroup: () => {},
  hideGroup: () => {},
  evaluateConditionals: () => {},
};

const useLayoutContextState = (): LayoutContextState => {
  const [elements, setElements] = useState<Map<string, LayoutElement>>(
    new Map(),
  );
  const [groups, setGroups] = useState<Map<string, LayoutGroup>>(new Map());

  const registerElement = (elementData: Omit<LayoutElement, "visible">) => {
    setElements((prev) => {
      const newMap = new Map(prev);
      const element: LayoutElement = {
        ...elementData,
        visible: false, // Default to hidden
      };
      newMap.set(elementData.id, element);

      // Add to group if specified
      if (elementData.group) {
        setGroups((prevGroups) => {
          const groupsMap = new Map(prevGroups);
          const group = groupsMap.get(elementData.group!);
          if (group && !group.elements.includes(elementData.id)) {
            const updatedGroup = {
              ...group,
              elements: [...group.elements, elementData.id],
            };
            groupsMap.set(group.id, updatedGroup);
          }
          return groupsMap;
        });
      }

      return newMap;
    });
  };

  const unregisterElement = (id: string) => {
    setElements((prev) => {
      const newMap = new Map(prev);
      const element = newMap.get(id);

      // Remove from group if it belongs to one
      if (element?.group) {
        setGroups((prevGroups) => {
          const groupsMap = new Map(prevGroups);
          const group = groupsMap.get(element.group!);
          if (group) {
            const updatedGroup = {
              ...group,
              elements: group.elements.filter((elementId) => elementId !== id),
            };
            groupsMap.set(group.id, updatedGroup);
          }
          return groupsMap;
        });
      }

      newMap.delete(id);
      return newMap;
    });
  };

  const updateElement = (id: string, updates: Partial<LayoutElement>) => {
    setElements((prev) => {
      const newMap = new Map(prev);
      const existing = newMap.get(id);
      if (existing) {
        const updated = { ...existing, ...updates };
        newMap.set(id, updated);
      }
      return newMap;
    });
  };

  const showElement = (id: string) => {
    setElements((prev) => {
      const newMap = new Map(prev);
      const element = newMap.get(id);
      if (element) {
        // Handle group exclusivity
        if (element.group) {
          const group = groups.get(element.group);
          if (group?.exclusive) {
            // Hide all other elements in the group
            for (const elementId of group.elements) {
              if (elementId !== id) {
                const otherElement = newMap.get(elementId);
                if (otherElement && otherElement.visible) {
                  const hiddenElement = { ...otherElement, visible: false };
                  newMap.set(elementId, hiddenElement);
                  otherElement.onVisibilityChange?.(false);
                }
              }
            }
          }
        }

        const updated = { ...element, visible: true };
        newMap.set(id, updated);
        element.onVisibilityChange?.(true);
      }
      return newMap;
    });
  };

  const hideElement = (id: string) => {
    setElements((prev) => {
      const newMap = new Map(prev);
      const element = newMap.get(id);
      if (element) {
        const updated = { ...element, visible: false };
        newMap.set(id, updated);
        element.onVisibilityChange?.(false);
      }
      return newMap;
    });
  };

  const toggleElement = (id: string) => {
    const element = elements.get(id);
    if (element) {
      if (element.visible) {
        hideElement(id);
      } else {
        showElement(id);
      }
    }
  };

  const getElementById = (id: string): LayoutElement | undefined => {
    return elements.get(id);
  };

  const getVisibleElements = (): LayoutElement[] => {
    return Array.from(elements.values()).filter((element) => element.visible);
  };

  const isElementVisible = (id: string): boolean => {
    const element = elements.get(id);
    return element?.visible ?? false;
  };

  // Group management methods
  const createGroup = (group: LayoutGroup) => {
    setGroups((prev) => {
      const newMap = new Map(prev);
      newMap.set(group.id, group);
      return newMap;
    });
  };

  const removeGroup = (id: string) => {
    setGroups((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });

    // Remove group reference from elements
    setElements((prev) => {
      const newMap = new Map(prev);
      for (const element of newMap.values()) {
        if (element.group === id) {
          const updated = { ...element };
          delete updated.group;
          newMap.set(element.id, updated);
        }
      }
      return newMap;
    });
  };

  const addElementToGroup = (elementId: string, groupId: string) => {
    const element = elements.get(elementId);
    if (element) {
      updateElement(elementId, { group: groupId });

      setGroups((prev) => {
        const newMap = new Map(prev);
        const group = newMap.get(groupId);
        if (group && !group.elements.includes(elementId)) {
          const updatedGroup = {
            ...group,
            elements: [...group.elements, elementId],
          };
          newMap.set(groupId, updatedGroup);
        }
        return newMap;
      });
    }
  };

  const removeElementFromGroup = (elementId: string, groupId: string) => {
    const element = elements.get(elementId);
    if (element?.group === groupId) {
      updateElement(elementId, { group: undefined });

      setGroups((prev) => {
        const newMap = new Map(prev);
        const group = newMap.get(groupId);
        if (group) {
          const updatedGroup = {
            ...group,
            elements: group.elements.filter((id) => id !== elementId),
          };
          newMap.set(groupId, updatedGroup);
        }
        return newMap;
      });
    }
  };

  const showGroup = (groupId: string) => {
    const group = groups.get(groupId);
    if (group) {
      for (const elementId of group.elements) {
        showElement(elementId);
      }
    }
  };

  const hideGroup = (groupId: string) => {
    const group = groups.get(groupId);
    if (group) {
      for (const elementId of group.elements) {
        hideElement(elementId);
      }
    }
  };

  const evaluateConditionals = () => {
    setElements((prev) => {
      const newMap = new Map(prev);
      let hasChanges = false;

      for (const element of newMap.values()) {
        if (element.conditional) {
          const shouldBeVisible = element.conditional.condition();
          if (shouldBeVisible !== element.visible) {
            const updated = { ...element, visible: shouldBeVisible };
            newMap.set(element.id, updated);
            element.conditional.onConditionChange?.(shouldBeVisible);
            element.onVisibilityChange?.(shouldBeVisible);
            hasChanges = true;
          }
        }
      }

      return hasChanges ? newMap : prev;
    });
  };

  return {
    elements,
    groups,
    registerElement,
    unregisterElement,
    updateElement,
    showElement,
    hideElement,
    toggleElement,
    getElementById,
    getVisibleElements,
    isElementVisible,
    createGroup,
    removeGroup,
    addElementToGroup,
    removeElementFromGroup,
    showGroup,
    hideGroup,
    evaluateConditionals,
  };
};

export interface LayoutContextProviderProps {
  children: ReactNode;
}

const { Provider, useContext } = createContextFactory(
  initialLayoutContextState,
  useLayoutContextState,
);

export const LayoutContextProvider = ({
  children,
}: LayoutContextProviderProps) => {
  return <Provider>{children}</Provider>;
};

/**
 * Hook to manage the layout context state.
 * @return The layout context state and methods.
 *
 * @description
 * The `useLayoutContextState` hook manages the state and behavior of layout elements within the application.
 * It provides methods to register, unregister, update, show, hide, and toggle layout elements by their unique IDs.
 * The hook maintains a map of layout elements and tracks their visibility status.
 * It also offers utility functions to retrieve elements and check their visibility.
 *
 * @example
 * const {
 *   registerElement,
 *   showElement,
 *   hideElement,
 *   toggleElement,
 *   getElementById,
 *   getVisibleElements,
 *   isElementVisible,
 * } = useLayoutContextState();
 * // Register a new layout element
 * registerElement({ id: 'sidebar', content: <Sidebar />, zIndex: 10 });
 * // Show the sidebar
 * showElement('sidebar');
 */
export const useLayoutContext = () => useContext();

/**
 * Hook to register and manage a layout element.
 * @param id - Unique identifier for the layout element.
 * @param content - The ReactNode content of the layout element.
 * @param options - Optional configuration for the layout element.
 * @return An object with methods to show, hide, toggle, and check visibility of the element.
 *
 * @description
 * The `useLayoutElement` hook allows components to register a layout element with the layout context.
 * It accepts an ID, content, and optional configuration such as auto-show, z-index, position, and visibility change callback.
 * The hook returns methods to control the visibility of the registered element and check its current visibility status.
 * The element is automatically registered on mount and unregistered on unmount.
 *
 * @example
 * const { show, hide, toggle, isVisible } = useLayoutElement('modal', <ModalContent />, {
 *   autoShow: true,
 *   animation: { enter: 'fade-in', exit: 'fade-out', duration: 300 },
 *   group: 'modals'
 * });
 * // Show the modal
 * show();
 */
export const useLayoutElement = (
  id: string,
  content: ReactNode,
  options?: {
    autoShow?: boolean;
    zIndex?: number;
    position?: LayoutElement["position"];
    onVisibilityChange?: (visible: boolean) => void;
    animation?: AnimationConfig;
    group?: string;
    conditional?: ConditionalConfig;
    priority?: number;
  },
) => {
  const {
    registerElement,
    unregisterElement,
    showElement,
    hideElement,
    toggleElement,
    isElementVisible,
  } = useLayoutContext();

  // Register element on mount
  useEffect(() => {
    registerElement({
      id,
      content,
      zIndex: options?.zIndex,
      position: options?.position,
      onVisibilityChange: options?.onVisibilityChange,
      animation: options?.animation,
      group: options?.group,
      conditional: options?.conditional,
      priority: options?.priority,
    });

    // Auto-show if requested
    if (options?.autoShow) {
      showElement(id);
    }

    // Cleanup on unmount
    return () => {
      unregisterElement(id);
    };
  }, [
    id,
    content,
    options?.zIndex,
    options?.position,
    options?.autoShow,
    options?.animation,
    options?.group,
    options?.conditional,
    options?.priority,
  ]);

  return {
    show: () => showElement(id),
    hide: () => hideElement(id),
    toggle: () => toggleElement(id),
    isVisible: isElementVisible(id),
  };
};

export type LayoutRendererProps = HTMLAttributes<HTMLDivElement>;

/**
 * Component to render all visible layout elements
 * @param props - HTML attributes for the container div
 * @returns A div containing all visible layout elements.
 * @description
 * The `LayoutRenderer` component retrieves all currently visible layout elements from the layout context
 * and renders them within a container div. Each element is sorted by its z-index to ensure proper layering.
 * The component accepts standard HTML attributes for the container div, allowing for customization of styles and properties.
 * Elements with animation configs will have their enter/exit classes applied automatically.
 * @example
 * ```tsx
 * import { LayoutRenderer } from '@enotion/core';
 *
 * const AppLayout = () => {
 *   return (
 *     <div>
 *       <LayoutRenderer className="layout-container" />
 *     </div>
 *   );
 * };
 * ```
 */
export const LayoutRenderer = ({ ...props }: LayoutRendererProps) => {
  const { getVisibleElements } = useLayoutContext();
  const visibleElements = getVisibleElements();

  return (
    <div {...props}>
      {visibleElements
        .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)) // Sort by z-index
        .map((element) => (
          <div
            key={element.id}
            className={element.animation?.enter}
            style={{
              position: element.position || "relative",
              zIndex: element.zIndex,
              animationDuration: element.animation?.duration
                ? `${element.animation.duration}ms`
                : undefined,
            }}
          >
            {element.render ? element.render() : element.content}
          </div>
        ))}
    </div>
  );
};
