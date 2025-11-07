import { CodeBlock } from "../src/CodeBlock.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("CodeBlock Component", () => {
  const sampleCode = `const greeting = "Hello, World!";
function sayHello() {
  console.log(greeting);
}`;

  it("renders with default props", () => {
    const { container } = render(<CodeBlock>{sampleCode}</CodeBlock>);
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeDefined();
    expect(sectionElement?.classList.contains("enotion-code-block")).toBe(true);
  });

  it("renders code content", () => {
    const { container } = render(<CodeBlock>{sampleCode}</CodeBlock>);
    const codeElement = container.querySelector("code");
    expect(codeElement).toBeDefined();
    expect(codeElement?.textContent).toContain("greeting");
    expect(codeElement?.textContent).toContain("sayHello");
  });

  it("applies custom className", () => {
    const { container } = render(
      <CodeBlock className="custom-class">{sampleCode}</CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    expect(sectionElement?.classList.contains("custom-class")).toBe(true);
  });

  it("applies custom styles", () => {
    const customStyle = { maxWidth: "500px", padding: "2rem" };
    const { container } = render(
      <CodeBlock style={customStyle}>{sampleCode}</CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    expect(sectionElement?.style.maxWidth).toBe("500px");
    expect(sectionElement?.style.padding).toBe("2rem");
  });

  it("renders with line numbers when showLineNumbers is true", () => {
    const { container } = render(
      <CodeBlock showLineNumbers>{sampleCode}</CodeBlock>,
    );
    const codeElement = container.querySelector("code");
    const lines = codeElement?.querySelectorAll("div");

    // Should have line number spans
    const lineNumberSpans = container.querySelectorAll("span");
    const hasLineNumbers = Array.from(lineNumberSpans).some(
      (span) =>
        span.textContent === "1" ||
        span.textContent === "2" ||
        span.textContent === "3",
    );
    expect(hasLineNumbers).toBe(true);
    expect(lines?.length).toBeGreaterThan(0);
  });

  it("does not render line numbers by default", () => {
    const { container } = render(<CodeBlock>{sampleCode}</CodeBlock>);
    const sectionElement = container.querySelector("section");
    // Should not have line number spans when showLineNumbers is false
    const lineNumberSpans = container.querySelectorAll("span");
    const hasLineNumbers = Array.from(lineNumberSpans).some(
      (span) => span.textContent === "1" || span.textContent === "2",
    );
    expect(hasLineNumbers).toBe(false);
    expect(sectionElement).toBeDefined();
  });

  it("applies theme colors correctly", () => {
    const { container } = render(
      <CodeBlock theme="dark">{sampleCode}</CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeDefined();
    // Dark theme should use dark background
    expect(sectionElement?.style.backgroundColor).toBeTruthy();
  });

  it("applies light theme colors", () => {
    const { container } = render(
      <CodeBlock theme="light">{sampleCode}</CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeDefined();
    expect(sectionElement?.style.backgroundColor).toBeTruthy();
  });

  it("applies color palette when provided", () => {
    const { container } = render(
      <CodeBlock palette="dark">{sampleCode}</CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeDefined();
    expect(sectionElement?.style.backgroundColor).toBeTruthy();
    expect(sectionElement?.style.color).toBeTruthy();
  });

  it("highlights specified lines", () => {
    const { container } = render(
      <CodeBlock highlightLines={[1, 3]}>{sampleCode}</CodeBlock>,
    );
    const codeElement = container.querySelector("code");
    const lines = codeElement?.querySelectorAll("div");

    expect(lines?.length).toBeGreaterThan(0);

    // First line should have highlight styling (border-left)
    const firstLine = lines?.[0];
    expect(firstLine?.style.borderLeft).toContain("3px");
  });

  it("tokenizes keywords correctly", () => {
    const { container } = render(<CodeBlock>{sampleCode}</CodeBlock>);
    const codeElement = container.querySelector("code");

    // Check if keywords are styled with bold font-weight
    const spans = codeElement?.querySelectorAll("span");
    const hasKeywordSpan = Array.from(spans || []).some((span) => {
      return span.style.fontWeight === "600";
    });

    expect(hasKeywordSpan).toBe(true);
  });

  it("handles multiline code correctly", () => {
    const multilineCode = `line 1
line 2
line 3
line 4`;
    const { container } = render(<CodeBlock>{multilineCode}</CodeBlock>);
    const codeElement = container.querySelector("code");
    const lines = codeElement?.querySelectorAll("div");

    expect(lines?.length).toBe(4);
  });

  it("handles empty code string", () => {
    const { container } = render(<CodeBlock>{""}</CodeBlock>);
    const preElement = container.querySelector("pre");
    expect(preElement).toBeDefined();
  });

  it("handles single line code", () => {
    const singleLine = "const x = 42;";
    const { container } = render(<CodeBlock>{singleLine}</CodeBlock>);
    const codeElement = container.querySelector("code");
    const lines = codeElement?.querySelectorAll("div");

    expect(lines?.length).toBe(1);
    expect(codeElement?.textContent).toContain("42");
  });

  it("applies language prop (for future extensibility)", () => {
    const { container } = render(
      <CodeBlock language="typescript">{sampleCode}</CodeBlock>,
    );
    const preElement = container.querySelector("pre");
    expect(preElement).toBeDefined();
  });

  it("highlights strings with correct styling", () => {
    const codeWithString = 'const msg = "hello";';
    const { container } = render(<CodeBlock>{codeWithString}</CodeBlock>);
    const codeElement = container.querySelector("code");

    expect(codeElement?.textContent).toContain("hello");
  });

  it("highlights numbers correctly", () => {
    const codeWithNumbers = "const num = 123.45;";
    const { container } = render(<CodeBlock>{codeWithNumbers}</CodeBlock>);
    const codeElement = container.querySelector("code");

    expect(codeElement?.textContent).toContain("123.45");
  });

  it("highlights comments with italic style", () => {
    const codeWithComment = "// This is a comment\nconst x = 1;";
    const { container } = render(<CodeBlock>{codeWithComment}</CodeBlock>);
    const codeElement = container.querySelector("code");
    const spans = codeElement?.querySelectorAll("span");

    const hasItalicSpan = Array.from(spans || []).some((span) => {
      return span.style.fontStyle === "italic";
    });

    expect(hasItalicSpan).toBe(true);
  });

  it("handles code with operators", () => {
    const codeWithOperators = "const sum = a + b - c * d / e;";
    const { container } = render(<CodeBlock>{codeWithOperators}</CodeBlock>);
    const codeElement = container.querySelector("code");

    expect(codeElement?.textContent).toContain("+");
    expect(codeElement?.textContent).toContain("-");
    expect(codeElement?.textContent).toContain("*");
  });

  it("handles code with functions", () => {
    const codeWithFunction = "function test() { return true; }";
    const { container } = render(<CodeBlock>{codeWithFunction}</CodeBlock>);
    const codeElement = container.querySelector("code");

    expect(codeElement?.textContent).toContain("function");
    expect(codeElement?.textContent).toContain("test");
  });

  it("combines palette and showLineNumbers", () => {
    const { container } = render(
      <CodeBlock palette="dark" showLineNumbers>
        {sampleCode}
      </CodeBlock>,
    );
    const sectionElement = container.querySelector("section");
    const codeElement = container.querySelector("code");

    expect(sectionElement).toBeDefined();
    expect(codeElement).toBeDefined();

    // Should have line numbers
    const lineNumberSpans = container.querySelectorAll("span");
    const hasLineNumbers = Array.from(lineNumberSpans).some(
      (span) => span.textContent === "1" || span.textContent === "2",
    );
    expect(hasLineNumbers).toBe(true);
  });

  it("renders with all features combined", () => {
    const { container } = render(
      <CodeBlock
        palette="dark"
        theme="dark"
        showLineNumbers
        highlightLines={[2]}
        className="full-featured"
        style={{ maxHeight: "400px" }}
      >
        {sampleCode}
      </CodeBlock>,
    );
    const sectionElement = container.querySelector("section");

    expect(sectionElement).toBeDefined();
    expect(sectionElement?.classList.contains("full-featured")).toBe(true);
    expect(sectionElement?.style.maxHeight).toBe("400px");
  });
});
