"use client";

import { useState, useEffect } from "react";
import ReactGA from "react-ga4";

import DayPicker from "@/components/DayPicker";
import { Event } from "@/support/types";
import EventCard from "@/components/EventCard/v3";
import { getEventWithDateAndTime } from "./support";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";

export async function getEventsByDay() {
  const url = "/.netlify/functions/events";
  const res = await fetch(url);

  if (!res.ok) {
    return;
  }

  const data = await res.json();

  const events = data.events
    .sort(
      (a: Event, b: Event) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    )
    .map(getEventWithDateAndTime);

  return events.reduce((eventsByDay: Record<string, Event[]>, event: Event) => {
    if (!eventsByDay[event.date]) {
      eventsByDay[event.date] = [];
    }

    eventsByDay[event.date].push(event);

    return eventsByDay;
  }, {});
}

export default function Home({
  events,
  daysOfWeek,
  genres,
}: {
  events: Event[];
  daysOfWeek: string[];
  genres: (string | number)[][];
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<Event[]>(events);
  const [eventsByDay, setEventsByDay] = useState<Record<string, Event[]>>({});
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>(
    {}
  );

  const genreClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const genre = e.currentTarget.textContent;
    if (!genre) {
      return;
    }

    const newValue = !selectedGenres[genre];

    const newSelectedGenres = { ...selectedGenres };

    newSelectedGenres[genre] = newValue;

    setSelectedGenres(newSelectedGenres);
  };

  const fetchEvents = async () => {
    const data = await getEventsByDay();
    setEventsByDay(data);
  };

  const initGA = () => {
    ReactGA.initialize("G-KZCQP5FKYK");
  };

  useEffect(() => {
    fetchEvents();
    initGA();
  }, []);

  useEffect(() => {
    if (!selectedDate || !eventsByDay || !eventsByDay[selectedDate]) {
      if (!Object.keys(selectedGenres).length) {
        return;
      }

      const filters = Object.keys(selectedGenres).reduce((acc, genre) => {
        if (selectedGenres[genre]) {
          acc += 1;
        }

        return acc;
      }, 0);

      if (!filters) {
        setSelectedEvents(events);
        return;
      }

      const filterEvents = events.filter((event) => {
        const genreFound = event.generativemetadata_set.find(
          (metadata) => selectedGenres[metadata.genre]
        )

        const subGenreFound = event.generativemetadata_set.find(
          (metadata) => selectedGenres[metadata.subgenre]
        )

        return genreFound || subGenreFound;
      });

      setSelectedEvents(filterEvents);

      return;
    }

    const items = eventsByDay[selectedDate];

    items.filter((event) => {
      if (!Object.keys(selectedGenres)) {
        return true;
      }

      return event.generativemetadata_set.find(
        (metadata) => selectedGenres[metadata.genre]
      );
    });

    setSelectedEvents(items);
  }, [selectedDate, eventsByDay, selectedGenres]);

  return (
    <>
      <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
        {genres.map(([genre]) => (
          <span
            key={genre}
            style={{
              display: "inline-block",
              padding: "6px 12px",
              margin: 6,
              cursor: "pointer",
              border: selectedGenres[genre]
                ? "1px dotted white"
                : "1px dotted transparent",
            }}
            onClick={genreClickHandler}
          >
            {genre}
          </span>
        ))}
      </div>
      <Nav>
        <DayPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          daysOfWeek={daysOfWeek}
        />
      </Nav>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "20px 6px",
          gap: 20,
          maxWidth: 780,
        }}
      >
        {selectedEvents.map((event) => {
          return <EventCard event={event} key={event.pk} />;
        })}
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
