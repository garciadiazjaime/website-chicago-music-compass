import Link from "next/link";
import { tokens } from "@/app/utils/tokens";

export default function AboutPage() {
    return <div style={{
        fontSize: 26,
        width: "100vw",
        height: "100vh",
        color: tokens.color.white,
        backgroundColor: tokens.color.primary
    }}>
        <div
            style={{
                padding: "100px 0 0",
                maxWidth: 1200,
                margin: "0 auto",
            }}
        >
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
                Welcome to <Link href="/" style={{ color: tokens.color.white }}>Chicago Music Compass</Link>! We&apos;re not just another tech team
                – we&apos;re music enthusiasts, bandmates, and tech wizards on a mission
                to shake up the Windy City&apos;s live music scene.
            </p>
            <p>
                Our journey began with a passion for live music, fueled by our
                experiences on stage and in the crowd. Now, armed with our tech
                expertise, we&apos;re ready to give back to the community that brings us
                so much joy.
            </p>

            <h2
                style={{
                    fontSize: "1.5rem",
                    color: "#64C7F9",
                    marginTop: 40
                }}
            >
                Contributors:
            </h2>
            <div
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
                <a href="https://www.garciadiazjaime.com/" style={style.anchor}>
                    Jaime Diaz <small>[Chicago]</small>
                </a>
                <a href="https://alex.mintitmedia.com/" style={style.anchor}>
                    Alex Romo <small>[San Diego]</small>
                </a>
                <a href="https://www.linkedin.com/in/octavio-fuentes-arce/" style={style.anchor}>
                    Octavio Fuentes <small>[Mexico City]</small>
                </a>
            </div>
        </div>
    </div>
}

const style = {
    anchor: {
        color: tokens.color.white,
        textDecoration: "none",
    }
}
