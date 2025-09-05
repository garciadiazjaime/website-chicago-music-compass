import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { codeToHtml } from "shiki";

import { tokens } from "@/support/token";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        style={{
          fontSize: 42,
          textAlign: "center",
          marginTop: "0",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: 28, margin: "60px 0 20px" }}>{children}</h2>
    ),
    p: ({ children }) => <p style={{ fontSize: 24 }}>{children}</p>,
    em: ({ children }) => (
      <em style={{ fontSize: 18, textAlign: "center", display: "block" }}>
        {children}
      </em>
    ),
    code: async (props) => {
      const lang = props.className?.split("-")[1] || "javascript";

      const html = await codeToHtml(props.children as string, {
        lang,
        theme: "solarized-light",
      });

      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    },
    img: (props) => (
      <Image
        width={400}
        height={400}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    hr: () => (
      <hr
        style={{
          border: "none",
          backgroundColor: "white",
          marginBottom: "60px",
        }}
      />
    ),
    li: ({ children }) => <li style={{ fontSize: 24 }}>{children}</li>,
    ...components,
  };
}
