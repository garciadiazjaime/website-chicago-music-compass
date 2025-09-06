import { ReactNode } from "react";
import { Logo, MapIcon } from "@/v1/components/svgs";
import { tokens } from "@/v1/support/token";
import Link from "next/link";

const Nav = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: ".1rem",
        backdropFilter: "blur(5px)",
        boxShadow: "0 0 2rem 0 rgba(0, 0, 0, .08)",
        padding: ".5rem 0",
        top: 0,
        zIndex: 40,
        position: "sticky",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          margin: '0 1rem',
        }}
      >
        <Link
          className="nav-logo"
          href="/"
          style={{
            display: "flex",
            flexShrink: 0,
            paddingLeft: ".5rem",
            width: "50px",
          }}
        >
          <Logo />
        </Link>
        {children}
        <a
          className="nav-map"
          href="/chicago/events"
          style={{
            display: "flex",
            flexShrink: 0,
            paddingRight: ".5rem",
          }}
          aria-label="Map about Events in Chicago"
        >
          <MapIcon />
        </a>
      </div>
      <style jsx>{`
        .nav-logo {
          width: 30px;

          @media (min-width: ${tokens.breakpoints.md}) {
            width: 50px;
          }
        }

        .nav-map {
          width: 25px;

          @media (min-width: ${tokens.breakpoints.md}) {
            width: 30px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;
