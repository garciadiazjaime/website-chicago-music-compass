import { logos } from "@/v1/components/socialLinks";
import styles from "./page.module.css";

export default function Intro({
  viewEventsHandler,
}: {
  viewEventsHandler: any;
}) {
  return (
    <div
      className={styles.intro}
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
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <li className={styles.socialMediaLogo}>
            <a href="">{logos.twitter}</a>
          </li>
          <li className={styles.socialMediaLogo}>
            <a href="">{logos.instagram}</a>
          </li>
        </ul>
      </div>
      <button
        onClick={viewEventsHandler}
        style={{
          border: "1px solid white",
          textAlign: "center",
          padding: "0 40px",
          marginTop: 24,
        }}
      >
        View Events
      </button>
    </div>
  );
}
