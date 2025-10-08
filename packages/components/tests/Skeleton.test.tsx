import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeAll, jest } from "@jest/globals";

import { SkeletonWrapper, Skeleton } from "../src/Skeleton";

class ResizeObserverMock {
  public static readonly instances: ResizeObserverMock[] = [];
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    ResizeObserverMock.instances.push(this);
  }

  observe(): void { }
  unobserve(): void { }
  disconnect(): void { }

  static invokeAll(entries: ResizeObserverEntry[] = []): void {
    for (const instance of ResizeObserverMock.instances) {
      instance.callback(entries, instance as unknown as ResizeObserver);
    }
  }
}

beforeAll(() => {
  // @ts-ignore Assign mock to global for tests
  global.ResizeObserver = ResizeObserverMock;
});

afterEach(() => {
  jest.restoreAllMocks();
  ResizeObserverMock.instances.length = 0;
});

describe("SkeletonWrapper", () => {
  it("renders children when not loading", () => {
    render(
      <SkeletonWrapper isLoading={false}>
        <div data-testid="content">Loaded content</div>
      </SkeletonWrapper>
    );

    const content = screen.queryByTestId("content");
    expect(content).not.toBeNull();
    expect(content?.textContent).toBe("Loaded content");
  });

  it("renders generated skeletons when loading", () => {
    const { container } = render(
      <SkeletonWrapper isLoading>
        <div className="box">
          <span>Inner text</span>
        </div>
      </SkeletonWrapper>
    );

    const skeletonNodes = container.querySelectorAll(".skeleton");
    expect(skeletonNodes.length).toBeGreaterThan(0);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.getAttribute("aria-busy")).toBe("true");
  });

  it("renders custom skeleton when provided", () => {
    render(
      <SkeletonWrapper
        isLoading
        skeleton={<div data-testid="custom-skeleton">Custom</div>}
      >
        <div>Actual content</div>
      </SkeletonWrapper>
    );

    const custom = screen.queryByTestId("custom-skeleton");
    expect(custom).not.toBeNull();
    expect(screen.queryByText("Actual content")).toBeNull();
  });
});

describe("Skeleton", () => {
  it("uses fallback dimensions when no reference provided", () => {
    const { container } = render(
      <Skeleton width={200} height={40} animate={false} className="extra" />
    );

    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton.classList.contains("skeleton")).toBe(true);
    expect(skeleton.classList.contains("skeleton-animate")).toBe(false);
    expect(skeleton.style.width).toBe("200px");
    expect(skeleton.style.height).toBe("40px");
  });

  it("uses reference element measurements when provided", async () => {
    const refElement = document.createElement("div");

    Object.defineProperty(refElement, "offsetWidth", {
      configurable: true,
      value: 120,
    });
    Object.defineProperty(refElement, "offsetHeight", {
      configurable: true,
      value: 24,
    });

    const getComputedStyleSpy = jest
      .spyOn(window, "getComputedStyle")
      .mockReturnValue({
        borderRadius: "8px",
      } as unknown as CSSStyleDeclaration);

    const ref = { current: refElement };
    const { container } = render(<Skeleton referenceElement={ref} />);

    await act(async () => {
      await Promise.resolve();
      ResizeObserverMock.invokeAll();
    });

    // Basic invocation assertion (avoid deep matcher causing type instantiation issues)
    expect(getComputedStyleSpy.mock.calls.length).toBeGreaterThan(0);

    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton.style.width).toBe("120px");
    expect(skeleton.style.height).toBe("24px");
    expect(skeleton.style.borderRadius).toBe("8px");
  });
});
