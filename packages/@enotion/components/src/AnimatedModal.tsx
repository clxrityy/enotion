import { adjustHexColorOpacity, ColorPalettes, ColorPaletteType, Icons, useLayoutContext } from "@enotion/core";
import { type UseAnimatedModalsOptions } from "@enotion/hooks";
import React, { ReactNode, HTMLAttributes, useEffect } from "react";
import { Modal } from "./Modal.js";
import { Button } from "./Button.js";

export interface AnimatedModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  palette?: ColorPaletteType;
  modalId: string;
  isOpen?: boolean;
  onClose?: () => void;
  animationConfig?: UseAnimatedModalsOptions['animationConfig'];
}

/**
 * AnimatedModal component that combines the Modal component with the useAnimatedModals hook
 * to provide animated modal functionality within the layout system.
 *
 * @param {AnimatedModalProps} props - The props for the AnimatedModal component.
 * @param {string} props.modalId - Unique identifier for the modal.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @param {ColorPaletteType} [props.palette] - Optional color palette for styling.
 * @param {boolean} [props.isOpen] - Flag to control the visibility of the modal.
 * @param {() => void} [props.onClose] - Callback function when modal is closed.
 * @param {AnimationConfig} [props.animationConfig] - Animation configuration for enter/exit animations.
 *
 * @description
 * The AnimatedModal component provides a modal that integrates with the layout system
 * and supports animations. It uses the useAnimatedModals hook internally and renders
 * the content using the Modal component for consistent styling.
 *
 * @example
 * ```tsx
 * import { AnimatedModal } from '@enotion/components';
 *
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       <AnimatedModal
 *         modalId="my-modal"
 *         isOpen={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         palette="primary"
 *         animationConfig={{
 *           enter: "animate-scaleIn",
 *           exit: "animate-scaleOut",
 *           duration: 300
 *         }}
 *       >
 *         <h2>Modal Title</h2>
 *         <p>Modal content goes here</p>
 *       </AnimatedModal>
 *     </>
 *   );
 * };
 * ```
 */
export const AnimatedModal = ({
  children,
  modalId,
  isOpen = false,
  onClose,
  palette,
  animationConfig,
  ...props
}: AnimatedModalProps) => {
  const { registerElement, showElement, hideElement } = useLayoutContext();

  // Use useEffect to show/hide modal based on isOpen prop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (onClose) {
        onClose();
      }
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleKeyDownReact = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    const modalContent = (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: palette ? adjustHexColorOpacity(ColorPalettes[palette]!.background, 0.5)! : 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDownReact}
        tabIndex={-1}
        {...props}
      >
        <div
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          tabIndex={0}
        >
          <Modal isOpen={true} palette={palette}>
            {children}
            {onClose && (
              <Button
                onClick={onClose}
                palette={palette}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
                aria-label="Close modal"
              >
                <Icons.Close size={18} />
              </Button>
            )}
          </Modal>
        </div>
      </div>
    );

    if (isOpen) {
      // Always register/update the modal element to ensure content is current
      registerElement({
        id: modalId,
        content: modalContent,
        zIndex: 1000,
        position: "fixed",
        animation: animationConfig ?? {
          enter: "animate-fadeIn",
          exit: "animate-fadeOut",
          duration: 300,
        },
      });

      // Show the modal
      showElement(modalId);

      // Add global key listener for escape key
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // Hide the modal when isOpen is false
      hideElement(modalId);
    }
  }, [isOpen, modalId, children, palette, onClose, animationConfig, props, registerElement, showElement, hideElement]);  // This component doesn't render anything directly -
  // the modal is rendered through the layout system
  return null;
};
