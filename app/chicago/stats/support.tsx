import moment from "moment";

import {
  EventPlain,
  LocationPlain,
  ArtistPlain,
  Network,
} from "@/support/types";

export function getEventsPerDay(events: EventPlain[]) {
  const response = events.reduce(
    (accumulator: { [key: string]: number }, item) => {
      const date = item.start_date.split(" ")[0];

      if (!accumulator[date]) {
        accumulator[date] = 0;
      }

      accumulator[date] += 1;

      return accumulator;
    },
    {}
  );

  const pastLimit = moment().subtract(7, "day");
  const nextLimit = moment().add(6, "day");

  const data = Object.keys(response)
    .sort((a, b) => (a < b ? -1 : 1))
    .filter(
      (key) =>
        new Date(key) > new Date(pastLimit.toString()) &&
        new Date(key) < new Date(nextLimit.toString())
    )
    .map((key) => ({ date: key, count: response[key] }));

  return {
    labels: data.map((item) => moment(item.date).format("MM/D ddd")),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data.map((item) => {
          if (moment(item.date) < moment().subtract(1, "day")) {
            return "rgba(255, 99, 132, 0.5)";
          }
          if (moment(item.date) > moment()) {
            return "rgba(75, 192, 192, 0.8)";
          }

          return "rgba(54, 162, 235, 1)";
        }),
      },
    ],
  };
}

export function getEventsByCreatedDate(events: EventPlain[]) {
  const response = events.reduce(
    (accumulator: { [key: string]: number }, item) => {
      const date = item.created.split(" ")[0];

      if (!accumulator[date]) {
        accumulator[date] = 0;
      }

      accumulator[date] += 1;

      return accumulator;
    },
    {}
  );

  const pastLimit = moment().subtract(7, "day");

  const data = Object.keys(response)
    .sort((a, b) => (a < b ? -1 : 1))
    .filter((key) => new Date(key) > new Date(pastLimit.toString()))
    .map((key) => ({ date: key, count: response[key] }));

  return {
    labels: data.map((item) => moment(item.date).format("MM/D ddd")),
    datasets: [
      {
        data: data
          .filter((item) => new Date(item.date) < new Date())
          .map((item) => item.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export function getSummaryArtistsLocations(
  locations: LocationPlain[],
  artists: ArtistPlain[]
) {
  return {
    labels: ["Locations", "Artists"],
    datasets: [
      {
        data: [locations.length, artists.length],
        backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };
}

export function getSocialNetworksSummary(
  locations: LocationPlain[],
  artists: ArtistPlain[]
) {
  const summary = {
    locations: {
      twitter: 0,
      facebook: 0,
      youtube: 0,
      instagram: 0,
      tiktok: 0,
      soundcloud: 0,
      appleMusic: 0,
      spotify: 0,
      band_camp: 0,
      link_tree: 0,
    },
    artists: {
      twitter: 0,
      facebook: 0,
      youtube: 0,
      instagram: 0,
      tiktok: 0,
      soundcloud: 0,
      appleMusic: 0,
      spotify: 0,
      band_camp: 0,
      link_tree: 0,
    },
  };
  // todo: get keys from interface
  const networks = [
    "twitter",
    "facebook",
    "youtube",
    "instagram",
    "tiktok",
    "soundcloud",
    "appleMusic",
    "spotify",
    "band_camp",
    "link_tree",
  ];

  locations.map((location) => {
    networks.map((network) => {
      const value = location[network as keyof LocationPlain];
      if (!value) {
        return;
      }

      summary.locations[network as keyof Network] += 1;
    });
  });

  artists.map((artist) => {
    networks.map((network) => {
      const value = +artist[network as keyof ArtistPlain];
      if (!value) {
        return;
      }

      summary.artists[network as keyof Network] += 1;
    });
  });

  return {
    labels: ["Locations", "Artists"],
    datasets: [
      {
        data: summary.locations.twitter,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };
}
