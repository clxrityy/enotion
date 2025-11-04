export const CorePackageExtraContent = () => (
  <p style={{ fontSize: "0.9rem", lineHeight: "1.4rem" }}>
    To import parts of the core package without importing the entire package, use:
    <br />
    <code>
      {`import { Icons } from "@enotion/core/constants";`}
    </code>
    <blockquote>
      This will only import the icons from the core package, reducing bundle size. This also eases use for non client-side environments.
    </blockquote>
  </p>
)

export const ComponentsPackageExtraContent = () => (
  <ul style={{ fontSize: "0.9rem", lineHeight: "1.4rem", listStyleType: "disc", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <li className="flex items-start w-fit">
      <span>
        All components require client-side rendering. Make sure to add
      </span>
      <pre>"use client";</pre>
      <span>
        at the top of your files.
      </span>
    </li>
    <li className="flex flex-col gap-2">
      To inherit component CSS styles:{" "}
      <code>
        {`import "@enotion/components/index.css";`}
      </code>
    </li>
  </ul>
)
