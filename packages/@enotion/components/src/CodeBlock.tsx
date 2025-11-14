import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { adjustHexColorOpacity, blendHexColors, cn } from "@enotion/core/utils";
import type { ReactNode, CSSProperties } from "react";
import "./styles/codeblock.css";

export type Theme = "light" | "dark";

export interface CodeBlockProps {
  children: string;
  palette?: ColorPaletteType;
  theme?: Theme;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Language-specific syntax highlighting patterns
 */
const SYNTAX_PATTERNS = {
  keyword:
    /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|default|async|await|try|catch|throw|new|delete|typeof|instanceof|in|of|break|continue|switch|case|interface|type|enum|namespace|module|declare|public|private|protected|static|readonly|abstract|as|implements|constructor|get|set|super|this)\b/g,
  string: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
  comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
  number: /\b(\d+\.?\d*|\.\d+)\b/g,
  function: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
  operator: /([+\-*/%=<>!&|^~?:]|&&|\|\||===|!==|==|!=|<=|>=|=>|\*\*|\.\.\.)/g,
  punctuation: /([{}[\]();,.])/g,
  boolean: /\b(true|false|null|undefined|void|never|any|unknown)\b/g,
  tag: /(<\/?[a-zA-Z][\w-]*|\/?>)/g,
  attribute: /\b([a-zA-Z-]+)(?==)/g,
  className: /\b([A-Z][\w$]*)\b/g,
};

/**
 * Tokenize code string into syntax elements
 */
function tokenizeCode(
  code: string,
  _language?: string,
): Array<{ type: string; value: string }> {
  const tokens: Array<{ type: string; value: string; index: number }> = [];

  // Extract all matches with their positions
  for (const [type, pattern] of Object.entries(SYNTAX_PATTERNS)) {
    const matches = code.matchAll(pattern);
    for (const match of matches) {
      if (match.index !== undefined) {
        tokens.push({
          type,
          value: match[0],
          index: match.index,
        });
      }
    }
  }

  // Sort by index
  tokens.sort((a, b) => a.index - b.index);

  // Fill in gaps with plain text and remove overlaps
  const result: Array<{ type: string; value: string }> = [];
  let lastIndex = 0;

  for (const token of tokens) {
    // Skip if this token overlaps with previous
    if (token.index < lastIndex) continue;

    // Add plain text before this token
    if (token.index > lastIndex) {
      result.push({
        type: "text",
        value: code.slice(lastIndex, token.index),
      });
    }

    // Add the token
    result.push({
      type: token.type,
      value: token.value,
    });

    lastIndex = token.index + token.value.length;
  }

  // Add remaining text
  if (lastIndex < code.length) {
    result.push({
      type: "text",
      value: code.slice(lastIndex),
    });
  }

  return result;
}

/**
 * Get color for a token type based on palette and theme
 */
function getTokenColor(
  type: string,
  palette?: ColorPaletteType,
  theme?: Theme,
): string {
  const colors = palette ? ColorPalettes[palette] : null;
  const isDark = theme === "dark";

  if (!colors) {
    // Fallback colors
    const fallbackColors = {
      keyword: isDark ? "#c678dd" : "#a626a4",
      string: isDark ? "#98c379" : "#50a14f",
      comment: isDark ? "#5c6370" : "#a0a1a7",
      number: isDark ? "#d19a66" : "#986801",
      function: isDark ? "#61afef" : "#4078f2",
      operator: isDark ? "#56b6c2" : "#0184bc",
      punctuation: isDark ? "#abb2bf" : "#383a42",
      boolean: isDark ? "#d19a66" : "#986801",
      tag: isDark ? "#e06c75" : "#e45649",
      attribute: isDark ? "#e5c07b" : "#c18401",
      className: isDark ? "#e5c07b" : "#c18401",
      text: isDark ? "#abb2bf" : "#383a42",
    };
    return (
      fallbackColors[type as keyof typeof fallbackColors] || fallbackColors.text
    );
  }

  // Use palette colors
  const tokenColorMap = {
    keyword: colors.primary,
    string: colors.success || colors.accent,
    comment: adjustHexColorOpacity(colors.highlight, 0.75),
    number: colors.warning || colors.accent,
    function: blendHexColors(colors.primary, colors.accent, 0.6),
    operator: colors.accent,
    punctuation: colors.foreground,
    boolean: colors.info || colors.primary,
    tag: colors.error || colors.primary,
    attribute: colors.warning || colors.accent,
    className: colors.warning || colors.accent,
    text: colors.foreground,
  };

  return tokenColorMap[type as keyof typeof tokenColorMap] || colors.foreground;
}

/**
 * CodeBlock - A syntax-highlighted code display component
 *
 * @param children - The code string to highlight
 * @param palette - Optional color palette for theming
 * @param theme - Optional theme (light/dark) for color adjustments
 * @param language - Programming language for syntax highlighting
 * @param showLineNumbers - Whether to display line numbers
 * @param highlightLines - Array of line numbers to highlight
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 *
 * @description
 * The CodeBlock component provides syntax highlighting for code snippets with support for
 * color palettes and themes. It features line numbers, line highlighting, and responsive
 * theming based on the provided palette or theme prop.
 *
 * @example
 * ```tsx
 * import { CodeBlock } from '@enotion/components';
 *
 * const code = `const greeting = "Hello, World!";
 * function sayHello() {
 *   console.log(greeting);
 * }`;
 *
 * <CodeBlock
 *   palette="dark"
 *   theme="dark"
 *   language="typescript"
 *   showLineNumbers
 *   highlightLines={[2]}
 * >
 *   {code}
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  palette,
  theme = "dark",
  language,
  showLineNumbers = false,
  highlightLines = [],
  className = "",
  style = {},
}: CodeBlockProps): ReactNode {
  const colors = palette ? ColorPalettes[palette] : null;
  const backgroundColor =
    colors?.background || (theme === "dark" ? "#282c34" : "#fafafa");
  const foregroundColor =
    colors?.foreground || (theme === "dark" ? "#abb2bf" : "#383a42");
  const borderColor =
    colors?.border || (theme === "dark" ? "#3e4451" : "#e1e4e8");
  const lineNumberColor = adjustHexColorOpacity(foregroundColor, 0.4);
  const highlightBg = colors?.muted
    ? adjustHexColorOpacity(colors.muted, 0.1)
    : adjustHexColorOpacity(foregroundColor, 0.05);

  const tokens = tokenizeCode(children, language);

  // Reconstruct tokens by line
  const lineTokens: Array<Array<{ type: string; value: string }>> = [[]];
  let currentLine = 0;

  for (const token of tokens) {
    const tokenLines = token.value.split("\n");

    if (tokenLines.length === 1) {
      lineTokens[currentLine]?.push(token);
    } else {
      // Token spans multiple lines
      for (let idx = 0; idx < tokenLines.length; idx++) {
        const line = tokenLines[idx];
        if (idx > 0) {
          currentLine++;
          lineTokens[currentLine] = [];
        }
        if (line && line.length > 0) {
          lineTokens[currentLine]?.push({
            type: token.type,
            value: line,
          });
        }
      }
    }
  }

  const codeBlockStyle: CSSProperties = {
    fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
    backgroundColor,
    color: foregroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "8px",
    padding: showLineNumbers ? "1rem 0" : "1rem",
    margin: 0,
    overflow: "auto",
    position: "relative",
    ...style,
  };

  const lineStyle = (lineNum: number): CSSProperties => ({
    display: "flex",
    paddingLeft: showLineNumbers ? "0" : "0.5rem",
    paddingRight: "1rem",
    backgroundColor: highlightLines.includes(lineNum)
      ? highlightBg || "transparent"
      : "transparent",
    borderLeft: highlightLines.includes(lineNum)
      ? `3px solid ${colors?.primary || "#61afef"}`
      : "3px solid transparent",
  });
  const lineNumberStyle: CSSProperties = {
    display: "inline-block",
    width: "3rem",
    paddingRight: "1rem",
    textAlign: "right",
    color: lineNumberColor || foregroundColor,
    userSelect: "none",
    flexShrink: 0,
  };
  return (
    <section
      className={cn(`enotion-code-block`, className)}
      style={codeBlockStyle}
    >
      <code>
        {lineTokens.map((lineTokenArray, lineIdx) => {
          const lineNum = lineIdx + 1;
          const lineKey = `line-${lineNum}-${lineTokenArray.length}`;
          return (
            <div key={lineKey} style={lineStyle(lineNum)}>
              {showLineNumbers && (
                <span style={lineNumberStyle}>{lineNum}</span>
              )}
              <span>
                {lineTokenArray.map((token, tokenIdx) => {
                  const tokenKey = `token-${lineNum}-${tokenIdx}-${token.type}`;
                  return (
                    <span
                      key={tokenKey}
                      style={{
                        color: getTokenColor(token.type, palette, theme),
                        fontWeight: token.type === "keyword" ? "600" : "normal",
                        fontStyle:
                          token.type === "comment" ? "italic" : "normal",
                      }}
                    >
                      {token.value}
                    </span>
                  );
                })}
              </span>
            </div>
          );
        })}
      </code>
    </section>
  );
}
