import { ReactNode } from "react";
import Link from "next/link";

export const MessageLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    href={href}
    style={{
      display: "flex",
      columnGap: "1rem",
      padding: "1rem 0",
      color: "#0D81CA",
      alignItems: "center",
      textDecoration: "none",
      width: "100%",
      justifyContent: "space-between",
    }}
  >
    {children}
    <span
      style={{
        border: `5px solid #0D81CA`,
        borderTop: "solid 5px transparent",
        borderRight: "solid 5px transparent",
        borderBottom: "solid 5px transparent",
        height: 1,
        marginBottom: "-2px",
      }}
    />
  </Link>
);

const MessageCard = ({ message }: { message: any }) => (
  <div
    style={{
      width: "100%",
      fontSize: "1.2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: "20",
      }}
    >
      <MessageLink href={message.link.url}>{message.text}</MessageLink>
    </div>
  </div>
);

export default MessageCard;
