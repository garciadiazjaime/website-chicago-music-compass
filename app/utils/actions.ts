"use server";

import { Event } from "@/app/utils/types";

export const getEvents = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_S3_URL!}/public/events.json`
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.events as Event[];
};
