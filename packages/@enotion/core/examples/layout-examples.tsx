/**
 * Enhanced Layout System Examples
 *
 * This file demonstrates how to use the enhanced layout context with:
 * - Animation support
 * - Layout groups (exclusive/non-exclusive)
 * - Conditional rendering
 * - Priority-based conflict resolution
 */

import React, { useState } from "react";
import {
  useLayoutElement,
  useLayoutContext,
  LayoutContextProvider,
  LayoutRenderer,
  type AnimationConfig,
  type ConditionalConfig,
} from "../contexts/layout";

// Example 1: Animated Modal System with Groups
export const useAnimatedModalSystem = () => {
  const { registerElement, showElement, hideElement, createGroup } =
    useLayoutContext();

  // Create exclusive modal group
  React.useEffect(() => {
    createGroup({
      id: "modals",
      elements: [],
      exclusive: true, // Only one modal can be visible at a time
    });
  }, [createGroup]);

  const showModal = (
    id: string,
    content: React.ReactNode,
    animation?: AnimationConfig,
  ) => {
    registerElement({
      id,
      content: (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            {content}
            <button
              onClick={() => hideElement(id)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ),
      zIndex: 1000,
      position: "fixed",
      group: "modals",
      animation: animation || {
        enter: "animate-fadeIn",
        exit: "animate-fadeOut",
        duration: 300,
      },
    });
    showElement(id);
  };

  const showConfirmModal = (message: string, onConfirm: () => void) => {
    showModal(
      "confirm-modal",
      <div>
        <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
        <p className="mb-6">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => hideElement("confirm-modal")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              hideElement("confirm-modal");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>,
      {
        enter: "animate-scaleIn",
        exit: "animate-scaleOut",
        duration: 200,
      },
    );
  };

  return { showModal, showConfirmModal };
};

// Example 2: Responsive Layout with Conditional Rendering
export const useResponsiveNavigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { evaluateConditionals } = useLayoutContext();

  const mobileCondition: ConditionalConfig = {
    condition: () => isMobile,
    onConditionChange: (visible) => {
      console.log(`Mobile navigation ${visible ? "shown" : "hidden"}`);
    },
  };

  const desktopCondition: ConditionalConfig = {
    condition: () => !isMobile,
    onConditionChange: (visible) => {
      console.log(`Desktop navigation ${visible ? "shown" : "hidden"}`);
    },
  };

  useLayoutElement("mobile-nav", <MobileNavigation />, {
    conditional: mobileCondition,
    zIndex: 100,
    position: "fixed",
    priority: 10,
  });

  useLayoutElement("desktop-nav", <DesktopNavigation />, {
    conditional: desktopCondition,
    zIndex: 50,
    position: "sticky",
    priority: 5,
  });

  // Listen for resize events
  React.useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        evaluateConditionals(); // Re-evaluate conditional visibility
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, evaluateConditionals]);

  return { isMobile };
};

// Example 3: Notification Toast System with Priorities
export const useToastSystem = () => {
  const { registerElement, showElement, hideElement } = useLayoutContext();

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
    duration = 3000,
  ) => {
    const id = `toast-${Date.now()}`;
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };

    const priorities = {
      error: 100,
      warning: 75,
      success: 50,
      info: 25,
    };

    registerElement({
      id,
      content: (
        <div
          className={`${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center justify-between min-w-80`}
        >
          <span>{message}</span>
          <button
            onClick={() => hideElement(id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      ),
      zIndex: 1100,
      position: "fixed",
      priority: priorities[type],
      animation: {
        enter: "animate-slideInRight",
        exit: "animate-slideOutRight",
        duration: 250,
      },
      onVisibilityChange: (visible) => {
        if (!visible) {
          // Cleanup after hiding
          setTimeout(() => hideElement(id), 250);
        }
      },
    });

    showElement(id);

    // Auto-hide after duration
    setTimeout(() => hideElement(id), duration);
  };

  return {
    showSuccess: (message: string) => showToast(message, "success"),
    showError: (message: string) => showToast(message, "error", 5000),
    showWarning: (message: string) => showToast(message, "warning", 4000),
    showInfo: (message: string) => showToast(message, "info"),
  };
};

// Example 4: Dynamic Sidebar with Groups
export const useSidebarSystem = () => {
  const { createGroup, showGroup, hideGroup, toggleElement } =
    useLayoutContext();
  React.useEffect(() => {
    // Create sidebar group
    createGroup({
      id: "sidebars",
      elements: [],
      exclusive: true, // Only one sidebar can be open at a time
    });
  }, [createGroup]);

  useLayoutElement("left-sidebar", <LeftSidebar />, {
    zIndex: 200,
    position: "fixed",
    group: "sidebars",
    animation: {
      enter: "animate-slideInLeft",
      exit: "animate-slideOutLeft",
      duration: 300,
    },
  });

  useLayoutElement("right-sidebar", <RightSidebar />, {
    zIndex: 200,
    position: "fixed",
    group: "sidebars",
    animation: {
      enter: "animate-slideInRight",
      exit: "animate-slideOutRight",
      duration: 300,
    },
  });

  return {
    toggleLeftSidebar: () => toggleElement("left-sidebar"),
    toggleRightSidebar: () => toggleElement("right-sidebar"),
    hideAllSidebars: () => hideGroup("sidebars"),
    showAllSidebars: () => showGroup("sidebars"),
  };
};

// Example Components
const MobileNavigation = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
    <nav className="flex justify-around p-4">
      <button className="flex flex-col items-center gap-1">
        <span>🏠</span>
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <span>🔍</span>
        <span className="text-xs">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <span>👤</span>
        <span className="text-xs">Profile</span>
      </button>
    </nav>
  </div>
);

const DesktopNavigation = () => (
  <div className="sticky top-0 bg-white border-b shadow-sm z-50">
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">App Name</h1>
        <div className="flex gap-4">
          <a href="/home" className="hover:text-blue-600">
            Home
          </a>
          <a href="/search" className="hover:text-blue-600">
            Search
          </a>
          <a href="/profile" className="hover:text-blue-600">
            Profile
          </a>
        </div>
      </div>
    </nav>
  </div>
);

const LeftSidebar = () => (
  <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-6">
    <h2 className="text-lg font-semibold mb-4">Navigation</h2>
    <nav className="space-y-2">
      <a
        href="/dashboard"
        className="block py-2 px-3 rounded hover:bg-gray-700"
      >
        Dashboard
      </a>
      <a href="/projects" className="block py-2 px-3 rounded hover:bg-gray-700">
        Projects
      </a>
      <a href="/settings" className="block py-2 px-3 rounded hover:bg-gray-700">
        Settings
      </a>
    </nav>
  </div>
);

const RightSidebar = () => (
  <div className="fixed right-0 top-0 h-full w-80 bg-white border-l p-6">
    <h2 className="text-lg font-semibold mb-4">Details</h2>
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-medium">Quick Actions</h3>
        <p className="text-sm text-gray-600 mt-1">
          Manage your tasks and projects
        </p>
      </div>
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-medium">Recent Activity</h3>
        <p className="text-sm text-gray-600 mt-1">View your recent changes</p>
      </div>
    </div>
  </div>
);

// Complete Demo Component
export const EnhancedLayoutDemo = () => {
  const { showModal, showConfirmModal } = useAnimatedModalSystem();
  const { showSuccess, showError, showWarning, showInfo } = useToastSystem();
  const { toggleLeftSidebar, toggleRightSidebar, hideAllSidebars } =
    useSidebarSystem();

  // Auto-setup responsive navigation
  useResponsiveNavigation();

  return (
    <LayoutContextProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Enhanced Layout Demo</h1>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => toggleLeftSidebar()}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Left Sidebar
              </button>
              <button
                onClick={() => toggleRightSidebar()}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Right Sidebar
              </button>
              <button
                onClick={() => hideAllSidebars()}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Hide All
              </button>
              <button
                onClick={() =>
                  showModal(
                    "info-modal",
                    <div>
                      <h3>Information</h3>
                      <p>This is an animated modal!</p>
                    </div>,
                  )
                }
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
              >
                Show Modal
              </button>
              <button
                onClick={() =>
                  showConfirmModal(
                    "Are you sure you want to delete this item?",
                    () => showSuccess("Item deleted!"),
                  )
                }
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Confirm Dialog
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => showSuccess("Operation completed successfully!")}
              className="p-4 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200"
            >
              Show Success Toast
            </button>
            <button
              onClick={() => showError("Something went wrong!")}
              className="p-4 bg-red-100 border border-red-300 rounded-lg hover:bg-red-200"
            >
              Show Error Toast
            </button>
            <button
              onClick={() => showWarning("Please check your input!")}
              className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg hover:bg-yellow-200"
            >
              Show Warning Toast
            </button>
            <button
              onClick={() => showInfo("Here is some helpful information!")}
              className="p-4 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200"
            >
              Show Info Toast
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Enhanced Layout Features
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                ✨ <strong>Animations:</strong> Smooth enter/exit animations
                with custom CSS classes
              </li>
              <li>
                🎯 <strong>Groups:</strong> Exclusive and non-exclusive element
                grouping
              </li>
              <li>
                📱 <strong>Conditional Rendering:</strong> Responsive elements
                based on conditions
              </li>
              <li>
                ⚡ <strong>Priority System:</strong> Conflict resolution for
                overlapping elements
              </li>
              <li>
                🔄 <strong>Dynamic Registration:</strong> Register/unregister
                elements on demand
              </li>
              <li>
                🎨 <strong>Z-Index Management:</strong> Automatic layering and
                positioning
              </li>
            </ul>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <LayoutRenderer className="fixed top-4 right-4 space-y-2 pointer-events-none" />
    </LayoutContextProvider>
  );
};
