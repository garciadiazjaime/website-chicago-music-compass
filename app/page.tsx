import type { Metadata } from "next";

import Splash from "@/components/Splash";
import Container from "./container";
import { Event } from "@/support/types";
import { getEventWithDateAndTime, getGenerativeMetadata } from "./support";
import { tokens } from "@/support/token";

async function getEvents() {
  const url = `${process.env.NEXT_PUBLIC_S3_URL!}/public/events.json`;

  const res = await fetch(url);

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  console.log({ created: data.created, total: data.events?.length });
  const today = new Date();

  return data.events
    .filter(
      (event: Event) => new Date(event.start_date).getDate() === today.getDate()
    )
    .map(getEventWithDateAndTime)
    .sort(
      (a: Event, b: Event) => Number(a.time) - Number(b.time)
    )
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getDaysOfWeek = () => {
  const response = ["Today"];

  const today = new Date().getDay();
  const SUNDAY = 0;
  if (today === SUNDAY) {
    return response;
  }

  return [...response, ...DAYS.slice(today)];
};

const getEventsJsonLD = (events: Event[]) => {
  return events.map((event) => ({
    "@context": "https://www.schema.org",
    "@type": "Event",
    name: event.name,
    url: event.url,
    description: event.description,
    startDate: event.start_date,
    location: {
      "@type": "Place",
      name: event.location.name,
      sameAs: event.location.website,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.address,
        addressCountry: "USA",
      },
    },
  }));
};

export const metadata: Metadata = {
  title: "Chicago Events, Live Concerts, Festivals, & Nightlife Today",
  description:
    "Discover the best things to do in Chicago today, including live music, events, concerts, festivals, and nightlife. Explore top activities happening near you in Chicago.",
  openGraph: {
    url: "https://www.chicagomusiccompass.com/",
    images: "https://www.chicagomusiccompass.com/social/FB-Cover.jpg",
  },
};

const Home = async () => {
  const events = await getEvents().catch(() => []);
  const eventsJsonLD = getEventsJsonLD(events);
  const daysOfWeek = getDaysOfWeek();
  const generatedMetadata = getGenerativeMetadata(events);

  return (
    <div
      date-date={new Date().toLocaleString()}
      data-time={new Date().toTimeString()}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatedMetadata) }}
      />

      <main
        style={{
          backgroundImage: `linear-gradient(
          180deg,
          #00050c 0%,
          #001126 70%,
          #001e43 100%
        )`,
          width: "100%",
          color: tokens.color.white,
          fontSize: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Splash />
        <Container events={events} daysOfWeek={daysOfWeek} genres={generatedMetadata.genres} />
      </main>
    </div>
  );
};

export default Home;
