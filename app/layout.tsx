import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const inter = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chicago Music Compass",
  description:
    "We're a trio of coding aficionados by day and music enthusiasts by night. Our project is all about showcasing the vibrant music scene across Chicago.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
