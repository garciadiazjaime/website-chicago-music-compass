"use client";

import { logos } from "@/components/socialLinks";

export default function Intro() {
  return (
    <div
      className="intro"
      style={{
        width: "100%",
        height: "95vh",
        fontSize: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        color: "white",
        fontFamily: "monospace",
        padding: 12,
      }}
    >
      <div>
        <p>
          hola, we&apos;re a trio of coding aficionados by day and music
          enthusiasts by night.
        </p>
        <p style={{ paddingTop: 24 }}>
          Chicago is our canvas, pulsing with art, music, and life.
        </p>
        <p style={{ paddingTop: 24 }}>
          Our project? It&apos;s all about showcasing the vibrant music scene
          across Chicagoland.
        </p>
        <p style={{ paddingTop: 24 }}>We&apos;d love to hear your thoughts!</p>
        <ul
          style={{
            listStyle: "none",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <li className="svg">
            <a href="">{logos.twitter}</a>
          </li>
          <li className="svg">
            <a href="">{logos.instagram}</a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .svg :global(svg) {
          height: 60px;
          width: 100%;
          padding: 12px;
        }
      `}</style>
      <style global jsx>{`
        @media (max-width: 700px) {
          .intro > * {
            font-size: 20px;
          }

          .intro {
            height: 90vh !important;
          }
        }
      `}</style>
    </div>
  );
}
