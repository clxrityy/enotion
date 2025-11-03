import { CodeBlock, LinkHeading } from "@enotion/components";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Basic HTML elements styled with your design system
    h1: ({ children }) => (
      <LinkHeading level={1} className="my-6 text-3xl font-bold">
        {children}
      </LinkHeading>
    ),
    h2: ({ children }) => (
      <LinkHeading level={2} className="my-4 text-2xl font-semibold">
        {children}
      </LinkHeading>
    ),
    h3: ({ children }) => (
      <LinkHeading level={3} className="my-3 text-xl font-medium">
        {children}
      </LinkHeading>
    ),
    h4: ({ children }) => (
      <LinkHeading level={4} className="my-2 text-lg font-medium">
        {children}
      </LinkHeading>
    ),
    h5: ({ children }) => (
      <LinkHeading level={5} className="my-1 text-base font-medium">
        {children}
      </LinkHeading>
    ),
    h6: ({ children }) => (
      <LinkHeading level={6} className="my-1 text-sm font-medium">
        {children}
      </LinkHeading>
    ),
    // If you prefer custom styling, uncomment the below and adjust as needed
    // h1: ({ children }) => (
    //   <h1 className="text-3xl font-bold my-6">{children}</h1>
    // ),
    // h2: ({ children }) => (
    //   <h2 className="text-2xl font-semibold my-4">{children}</h2>
    // ),
    // h3: ({ children }) => (
    //   <h3 className="text-xl font-medium my-3">{children}</h3>
    // ),
    pre: ({ children }) => <div className="my-4">{children}</div>,
    code: ({ children }) => (
      <CodeBlock className="my-4">
        {children}
      </CodeBlock>
    ),
    ul: ({ children }) => (
      <ul className="list-disc mb-4 list-inside space-y-1 ml-4 mt-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-foreground">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <section className="mdx-table-wrapper">
        <table className="mdx-table">
          {children}
        </table>
      </section>
    ),
    thead: ({ children }) => (
      <thead>
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),
    th: ({ children }) => (
      <th>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td>
        {children}
      </td>
    ),
    tr: ({ children }) => (
      <tr>
        {children}
      </tr>
    ),
    ...components,
  };
}
