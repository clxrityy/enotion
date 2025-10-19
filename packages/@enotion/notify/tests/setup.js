require("@testing-library/jest-dom");

// Mock matchMedia
Object.defineProperty(globalThis.window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => {
  return {
    width: 275,
    height: 100,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    toJSON: () => "{}",
  };
});
