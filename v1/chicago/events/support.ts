import { Event } from "@/v1/support/types";

function slugify(str: string) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const getEventID = (event: Event) =>
  `${slugify(event.name)}-${event.start_date.split("T")[0]}`;

export const getKey = (event: Event, index: number, label?: string) =>
  `${event.start_date.split("T")[0]}-${index}-${label}`;

export const filterEventsByDate = (events: Event[], date: Date) =>
  events.filter(
    (event) =>
      new Date(event.start_date).toLocaleDateString() ===
      date.toLocaleDateString()
  );
