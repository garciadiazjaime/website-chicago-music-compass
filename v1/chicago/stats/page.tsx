import LiveEventsChart from "./liveEventsChart";
import EventsCreatedByDate from "./eventsCreatedByDate";
import SummaryArtistsLocations from "./summaryArtistsLocations";
import SocialNetworksSummary from "./socialNetworksSummary";
import {
  getEventsPerDay,
  getEventsByCreatedDate,
  getSummaryArtistsLocations,
  getSocialNetworksSummary,
} from "./support";

async function extract(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    return {};
  }

  return res.json();
}

async function getEvents() {
  const url = `${process.env.NEXT_PUBLIC_S3_URL!}/data/events.json`;
  return extract(url);
}

async function getLocations() {
  const url = `${process.env.NEXT_PUBLIC_S3_URL!}/data/locations.json`;
  return extract(url);
}

async function getArtists() {
  const url = `${process.env.NEXT_PUBLIC_S3_URL!}/data/artists.json`;
  return extract(url);
}

export default async function Stats() {
  const { created: eventsCreated, data: events } = await getEvents();
  const { created: locationsCreated, data: locations } = await getLocations();
  const { created: artistsCreated, data: artists } = await getArtists();

  const eventsPerDay = getEventsPerDay(events);
  const eventsCreatedByDay = getEventsByCreatedDate(events);
  const summaryArtistsLocations = getSummaryArtistsLocations(
    locations,
    artists
  );
  const socialNetworksSummary = getSocialNetworksSummary(locations, artists);

  return (
    <div>
      <div>
        <LiveEventsChart data={eventsPerDay} />
      </div>
      <div>
        <EventsCreatedByDate data={eventsCreatedByDay} />
      </div>
      <div>
        <SummaryArtistsLocations data={summaryArtistsLocations} />
      </div>
      <div>
        <SocialNetworksSummary data={socialNetworksSummary} />
      </div>
      <div>
        <small>events created: {eventsCreated}</small> <br />
        <small>locations created: {locationsCreated}</small> <br />
        <small>artists created: {artistsCreated}</small>
      </div>
    </div>
  );
}
