import withMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    mdxRs: true, // Use the faster Rust-based MDX compiler
  },
  turbopack: {
    root: "../../../",
  },
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
