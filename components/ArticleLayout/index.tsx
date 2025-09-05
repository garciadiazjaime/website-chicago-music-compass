"use client";

import { ReactNode } from "react";
import { tokens } from "@/support/token";
import Footer from "../Footer";
import Nav from "../Nav";

const ArticleLayout = ({
  children,
  title = "",
}: {
  children: ReactNode | ReactNode[];
  title: string;
}) => (
  <>
    <style jsx={true} global={true}>{`
      body {
        background-image: ${tokens.gradients.hLight};
        width: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
    <section
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Nav>{title}</Nav>
      <article
        style={{
          maxWidth: 780,
          width: "calc(100% - 0px)",
          backgroundColor: "rgba(255, 255, 255, .6)",
          boxSizing: "border-box",
          padding: "40px 12px",
        }}
      >
        {children}
      </article>
    </section>
    <Footer theme="light" />
  </>
);
export default ArticleLayout;
