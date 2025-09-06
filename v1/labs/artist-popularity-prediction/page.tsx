import type { Metadata } from "next";

import ArticleLayout from "@/v1/components/ArticleLayout";

import Container from "./container";

export const metadata: Metadata = {
  title: "How popular are you?",
  description:
    "Discover how popular your Twitter account is compared to famous artists",
  openGraph: {
    url: "https://www.chicagomusiccompass.com/labs/artist-popularity-prediction",
    images: "https://www.chicagomusiccompass.com/social/FB-Cover.jpg",
  },
};

export default function Page() {
  return (
    <ArticleLayout title="Labs">
      <h1>How popular are you?</h1>
      <Container />
    </ArticleLayout>
  );
}
