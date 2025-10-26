"use client";

import { AnimatedModal, Button, Modal } from "@enotion/components";
import { useColorPalette } from "@enotion/hooks";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);

  const { palette } = useColorPalette();

  return (
    <div className="p-8 h-full flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to enotion</h1>

      <div className="flex gap-4">
        <Button palette={palette} onClick={() => setIsOpen(true)}>
          Show Animated Modal
        </Button>
        <Button onClick={() => setIsBasicModalOpen(true)}>
          Show Basic Modal
        </Button>
      </div>

      {/* Basic Modal Test */}
      <Modal
        palette={palette}
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
      >
        <h2 className="text-2xl font-semibold mb-4">Basic Modal</h2>
        <p className="mb-4">
          This is a basic modal component that hovers over the page content.
        </p>
        <div className="flex gap-2">
          <Button palette={palette} onClick={() => setIsBasicModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* Animated Modal Test */}
      <AnimatedModal
        palette={palette}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        modalId="modal-test"
      >
        <h2 className="text-2xl font-semibold mb-4">Animated Modal</h2>
        <p className="mb-4">
          This is an animated modal with layout integration.
        </p>
        <div className="flex gap-2">
          <Button palette={palette} onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </AnimatedModal>
    </div>
  );
}
