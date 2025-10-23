// Mock IntersectionObserver for Jest tests
class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    // Mock implementation - immediately trigger callback
    setTimeout(() => {
      this.callback([
        {
          isIntersecting: true,
          target: {},
          intersectionRatio: 1,
          boundingClientRect: {},
          intersectionRect: {},
          rootBounds: {},
          time: Date.now(),
        },
      ]);
    }, 0);
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver if needed
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Mock implementation
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
}

globalThis.ResizeObserver = MockResizeObserver;

// Mock matchMedia
Object.defineProperty(globalThis.window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = () => ({
  width: 275,
  height: 100,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  toJSON: () => "{}",
});
