import { Poppins, Barlow_Condensed } from "next/font/google";

import { tokens } from "@/support/token";

const fontPoppins = Poppins({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const fontBarlow_Condensed = Barlow_Condensed({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Splash() {
  return (
    <header
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100vw",
        maxWidth: 800,
        height: "calc(100vh - 80px)",
      }}
    >
      <div
        style={{
          display: "sticky",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10%",
          gap: "2rem",
        }}
      >
        <h1
          className={fontPoppins.className}
          style={{
            textTransform: "uppercase",
            color: tokens.color.white,
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.9,
            textAlign: "center",
            fontSize: 52,
          }}
        >
          <span
            className={fontBarlow_Condensed.className}
            style={{
              color: tokens.color.lightBlue,
              letterSpacing: 0,
            }}
          >
            Chicago
          </span>{" "}
          Live Events, Concerts, Festivals, & Nightlife
        </h1>

        <div style={{ fontSize: 28, textAlign: "center", opacity: 0.9 }}>
          Discover the best things to do in Chicago today, from live music and
          concerts to festivals and nightlife. Stay updated on all the exciting
          events happening near you in the city.
        </div>
      </div>
    </header>
  );
}
