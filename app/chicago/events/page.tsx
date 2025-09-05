import Container from "./container";

import "@/app/globals.css";

async function getEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_S3_URL!}/public/events.json`
  );

  if (!res.ok) {
    return;
  }

  const data = await res.json();

  return data.events;
}

export default async function Home() {
  const events = await getEvents().catch(() => []);

  if (!events.length) {
    return <div>:( no events</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#172554", width: "100vw", height: "100vh" }}
    >
      <Container events={events} />
    </div>
  );
}
