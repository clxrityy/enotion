// Alternative MDX configuration approach
// This file can be used if we need more complex plugin configurations

import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: true,
  defaultLang: "plaintext",
};

export const mdxConfig = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
};

export default mdxConfig;
