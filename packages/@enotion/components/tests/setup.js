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
