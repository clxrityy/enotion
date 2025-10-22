import { useLayoutContext, type AnimationConfig } from "@enotion/core";
import { ReactNode } from "react";

export interface UseAnimatedModalsOptions {
  animationConfig?: AnimationConfig;
}

/**
 * useAnimatedModals hook to manage animated modals within a layout context.
 *
 * @see {@link AnimationConfig} for animation configuration options.
 * @see {@link useLayoutContext} for accessing layout context methods.
 *
 * @example
 * ```tsx
 * import { useAnimatedModals } from '@enotion/hooks';
 *
 * const MyComponent = () => {
 *   const { showModal } = useAnimatedModals({
 *     animationConfig: {
 *       enter: "animate-slideInUp",
 *       exit: "animate-slideOutDown",
 *       duration: 500
 *     }
 *   });
 *
 *  return (
 *    <button onClick={() => showModal("my-modal", <div>My Modal Content</div>)}>
 *      Open Modal
 *    </button>
 *  )
 * };
 * ```
 *
 * @description
 * The `useAnimatedModals` hook provides methods to register and display modals with animations
 * within a layout context. It leverages the `useLayoutContext` hook to interact with the layout system.
 * **Note:** This hook should be used within a component wrapped by a `LayoutProvider` from `@enotion/components`.
 */
export const useAnimatedModals = ({
  animationConfig,
}: UseAnimatedModalsOptions) => {
  const { registerElement, showElement } = useLayoutContext();

  const showModal = (modalId: string, content: ReactNode) => {
    // Register the element
    registerElement({
      id: modalId,
      content,
      zIndex: 1000,
      position: "fixed",
      animation: animationConfig ?? {
        enter: "animate-fadeIn",
        exit: "animate-fadeOut",
        duration: 300
      },
    });

    // Show the modal
    showElement(modalId);
  }

  return { showModal };
}
