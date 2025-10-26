import {
  adjustHexColorOpacity,
  ColorPalettes,
  ColorPaletteType,
} from "@enotion/core";
import { useOutsideClick } from "@enotion/hooks";
import { HTMLAttributes, ReactNode, useRef, useEffect } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  palette?: ColorPaletteType;
  isOpen: boolean;
  onClose?: () => void;
}

/**
 * Modal component that displays content in a dialog box overlay.
 * @param {ModalProps} props - The props for the Modal component.
 * @param {boolean} props.isOpen - Flag to control the visibility of the modal.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @param {function} props.onClose - Optional callback function called when the modal should close.
 * @param [props.palette] @see {@link ColorPaletteType} - Optional color palette for styling.
 *
 * @description The Modal component provides a dialog box that overlays the page content when isOpen is true.
 *
 * @example
 * ```tsx
 * <Modal isOpen={true} onClose={() => setIsOpen(false)}>
 *   <div>This is the modal content</div>
 * </Modal>
 * ```
 */
export const Modal = ({
  children,
  palette,
  isOpen,
  onClose,
  ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const color = palette ? ColorPalettes[palette] : undefined;

  useOutsideClick({
    ref: modalRef,
    callback: () => {
      if (onClose) {
        onClose();
      }
    },
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        className="modal-content"
        style={{
          backgroundColor: color?.background || "#ffffff",
          color: color?.foreground || "#000000",
          border: `1px solid ${color?.border || "#e2e8f0"}`,
          borderRadius: "8px",
          padding: "24px",
          boxShadow: `0 4px 12px ${adjustHexColorOpacity(color?.accent || "#000000", 0.15)}`,
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          minWidth: "300px",
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
