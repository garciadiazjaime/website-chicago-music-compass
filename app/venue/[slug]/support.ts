import { LocationChart } from "@/support/types";

const NEIGHBORS_LIMIT = 7;

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function gitDistanceKM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLatRad = toRad(lat2 - lat1);
  const dLonRad = toRad(lon2 - lon1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const a =
    Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
    Math.sin(dLonRad / 2) *
      Math.sin(dLonRad / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const R = 6371; // Radius of the earth in km
  const distance = R * c;

  return distance;
}

function getNeighbors(
  locations: LocationChart[],
  venue: LocationChart
): LocationChart[] {
  const neighbors = locations
    .filter((item) => item.id !== venue.id)
    .map((item) => ({
      ...item,
      distance: gitDistanceKM(+venue.lat, +venue.lng, +item.lat, +item.lng),
    }))
    .sort((a, b) => a.distance - b.distance);

  return neighbors
    .slice(0, NEIGHBORS_LIMIT)
    .sort((a, b) => +b.events - +a.events);
}

export function getData(
  locations: LocationChart[],
  slug: string
): {
  venue?: LocationChart;
  neighbors: LocationChart[];
} {
  const venue = locations.find((item) => item.slug === slug) as LocationChart;
  if (!venue) {
    return { neighbors: [] };
  }

  const neighbors = getNeighbors(locations, venue);

  return { venue, neighbors };
}

export function getMiles(meters: number) {
  return meters * 0.000621371192;
}
