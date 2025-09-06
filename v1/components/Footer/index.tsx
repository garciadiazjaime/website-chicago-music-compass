"use client";
import Link from "next/link";

import { tokens } from "@/v1/support/token";
import { logos } from "@/v1/components/socialLinks";

const Footer = ({ theme }: { theme?: "dark" | "light" }) => (
  <footer
    className="footer"
    id="cmc"
    style={{
      margin: "1rem",
      paddingBottom: 12,
      fontSize: 20,
      width: "calc(100% - 2rem)",
      maxWidth: "780px",
      fontFamily: "sans-serif",
      color: theme === "light" ? "black" : "white",
      backgroundImage:
        theme === "light" ? tokens.gradients.redLight : tokens.gradients.red,
    }}
  >
    <div style={{ padding: "12px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          color: tokens.color.lightBlue,
          marginTop: 0,
        }}
      >
        About Us:
      </h2>
      <p>
        Welcome to Chicago Music Compass! We&apos;re not just another tech team
        – we&apos;re music enthusiasts, bandmates, and tech wizards on a mission
        to shake up the Windy City&apos;s live music scene.
      </p>
      <p>
        Our journey began with a passion for live music, fueled by our
        experiences on stage and in the crowd. Now, armed with our tech
        expertise, we&apos;re ready to give back to the community that brings us
        so much joy.
      </p>
      <p>
        At Chicago Music Compass, we&apos;re all about data-driven insights and
        rocking revelations. We&apos;ve scoured the city to compile live show
        data – dates, venues, artists, and more – all served up for your
        browsing pleasure.
      </p>
      <p>
        But we&apos;re not stopping there. Our next riff? Dive deep into the
        data, spotlighting Chicago&apos;s music scene. From interactive
        dashboards to insightful correlations, we&apos;re here to help venues
        fine-tune their tunes and fans discover their next favorite gig.
      </p>
      <p>
        Join us on this wild ride. Have an idea for a killer feature? Hit us up
        – we&apos;re all ears!
      </p>
      <br />
      <h2
        style={{
          fontSize: "1.5rem",
          color: "#64C7F9",
        }}
      >
        Follow us on:
      </h2>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          flexWrap: "wrap",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <li>
          <a
            href="https://discord.com/channels/1099362050855149638/1099362050855149641"
            rel="nofollow"
            aria-label="Discord Channel"
            target="_blank"
          >
            {logos.discord}
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/chimusiccompass"
            rel="nofollow"
            aria-label="follow us on Twitter"
            target="_blank"
          >
            {logos.twitter}
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/chicagomusiccompass/"
            rel="nofollow"
            aria-label="follow us on Instagram"
            target="_blank"
          >
            {logos.instagram}
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/people/ChicagoMusic-Compass/pfbid0kWe8UUC8ZtAowz5wx5S4ygKrZ3eTGAnYhhB95x5obRLwuD8vN5JZ3G16k4S3DWZRl/"
            rel="nofollow"
            aria-label="follow us on Facebook"
            target="_blank"
          >
            {logos.facebook}
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCWJE0M7LgZjKBvvceSmSEBw"
            rel="nofollow"
            aria-label="follow us on Youtube"
            target="_blank"
          >
            {logos.youtube}
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@livemusic210"
            rel="nofollow"
            aria-label="follow us on Tiktok"
            target="_blank"
          >
            {logos.tiktok}
          </a>
        </li>
      </ul>
      <h2
        style={{
          fontSize: "1.5rem",
          color: "#64C7F9",
          marginTop: 42,
        }}
      >
        More about the project
      </h2>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          flexWrap: "wrap",
          margin: 0,
          padding: 0,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <li>
          <Link
            href="/blog/artists-popularity-model"
            style={{
              color:
                theme === "light" ? tokens.color.black : tokens.color.white,
              textDecoration: "none",
            }}
          >
            Blog: Artist Polularity Model
          </Link>
        </li>
        <li>
          <Link
            href="/blog/how-cmc-was-built"
            style={{
              color:
                theme === "light" ? tokens.color.black : tokens.color.white,
              textDecoration: "none",
            }}
          >
            Blog: How Chicago Music Compass was built
          </Link>
        </li>
        <li>
          <Link
            href="/labs/artist-popularity-prediction"
            style={{
              color:
                theme === "light" ? tokens.color.black : tokens.color.white,
              textDecoration: "none",
            }}
          >
            Labs: Artist Popularity Prediction
          </Link>
        </li>
      </ul>
    </div>
    <style jsx>{`
      a {
        color: white;
        text-decoration: none;

        &:hover {
          color: #ff2751;
        }
      }

      p {
        font-size: 16px;
      }
    `}</style>
  </footer>
);

export default Footer;
