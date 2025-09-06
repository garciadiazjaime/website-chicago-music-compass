"use client";

import { useEffect, useState, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
import TagManager from "react-gtm-module";
import Image from "next/image";
import { Event } from "../../support/types";
import Header from "@/v1/components/Header";
import EventCard from "@/v1/components/EventCard";
import useModal from "@/v1/components/Modal/useModal";
import Modal from "@/v1/components/Modal";
import styles from "./page.module.css";

import { getEventID, getKey, filterEventsByDate } from "./support";
import { Chevron } from "@/v1/components/svgs";

const tagManagerArgs = {
  gtmId: "GTM-5TDDZW8S",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Home({ events }: { events: Event[] }) {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Event[]>(
    filterEventsByDate(events, selectedDate)
  );
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [map, setMap] = useState<google.maps.Map | null>();
  const viewRef = useRef<null | HTMLDivElement>(null);
  const {
    ref: expiredEventRef,
    onOpen: openExpiredEventModal,
    onClose: closeExpiredEventModal,
  } = useModal();

  const [center] = useState({
    lat: 41.8777569,
    lng: -87.6271142,
  });

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const currentDay = new Date().getDay() - 1;

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  useEffect(() => {
    if (!map || !selectedEvents.length) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    selectedEvents.forEach((event) => {
      const latlng = new window.google.maps.LatLng(
        event.location.lat,
        event.location.lng
      );

      bounds.extend(latlng);
    });

    map.fitBounds(bounds);
  }, [map, selectedEvents]);

  const markerClickHandler = (event: Event) => {
    setSelectedEvent(event);
    const scrollSnapSection = document.getElementById("scrollSnap");
    const element = document.getElementById(getEventID(event));
    scrollSnapSection?.classList.remove("snap-mandatory", "snap-x");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    setTimeout(() => {
      scrollSnapSection?.classList.add("snap-mandatory", "snap-x");
    }, 1000);
  };

  useEffect(() => {
    const _events = filterEventsByDate(events, selectedDate);
    setSelectedEvents(_events);
  }, [selectedDate, events]);

  const setPin = (event: Event) => {
    setSelectedEvent(event);
    if (map) {
      map.setZoom(13);
      map.panTo({
        lat: event.location.lat,
        lng: event.location.lng,
      });
    }
  };

  useEffect(() => {
    const slug = window.location.hash.replace("#", "");

    if (!slug) {
      return;
    }

    const event = events.find((event) => event.slug === slug);
    if (!event) {
      openExpiredEventModal();
      return;
    }

    setPin(event);
    markerClickHandler(event);
  }, [events, openExpiredEventModal]);

  useEffect(() => {
    if (!selectedEvent) {
      return;
    }
  }, [selectedEvent, router]);

  const initMap = async () => {
    if (isLoaded) {
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS!,
    });

    await loader.load();

    setIsLoaded(true);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <div className={styles.mainContent}>
        <div className="h-screen flex flex-col bg-gradient-to-t  to-blue-950 from-red-950">
          <Header currentDay={currentDay} setSelectedDate={setSelectedDate} />
          <Modal ref={expiredEventRef} onClose={closeExpiredEventModal}>
            <div className="flex flex-col gap-6 items-center sm:text-xl">
              <Image
                src="/images/gigsGone.webp"
                width="997"
                height="843"
                className="w-2/3 sm:w-1/3 h-auto"
                alt="Event has expired"
              />
              <h1 className="flex flex-wrap text-2xl sm:text-4xl lg:text-5xl font-bold text-rose-500 items-center">
                Oops! That Event Has Passed
              </h1>
              <div className="md:w-2/3 gap-6 flex flex-col text-rose-200">
                <p>
                  Looks like you&apos;ve landed on a gig that&apos;s already
                  played its tune. No worries, it happens!
                </p>
                <p>
                  Why not browse our site for fresh, upcoming events? From indie
                  jams to jazz vibes, there&apos;s always something new to
                  discover.
                </p>
                <button
                  onClick={closeExpiredEventModal}
                  className="flex items-center justify-center text-center gap-2 sm:gap-4 text-rose-100 font-semibold hover:text-white"
                >
                  <h2 className=" underline">
                    Get back into the groove and find your next favorite gig!
                  </h2>
                  <div className="w-5 sm:w-8 h-auto">
                    <Chevron />
                  </div>
                </button>
              </div>
            </div>
          </Modal>
          <main className="h-full flex flex-col-reverse lg:flex-row flex-1 overflow-hidden">
            <section
              id="scrollSnap"
              className="w-full lg:w-96 lg:h-full overflow-x-scroll snap-mandatory snap-x lg:snap-none lg:overflow-x-hidden lg:overflow-y-scroll"
            >
              <div className="flex lg:flex-col gap-4 lg:gap-6" ref={viewRef}>
                {selectedEvents.map((event, index) => (
                  <div
                    key={getKey(event, index)}
                    className="w-11/12 md:w-1/2 lg:w-full shrink-0 snap-center first:pl-8 lg:first:pl-0 last:pr-8 lg:last:pr-0 items-stretch"
                    id={getEventID(event)}
                  >
                    <EventCard
                      event={event}
                      selected={
                        selectedEvent &&
                        getEventID(event) === getEventID(selectedEvent)
                      }
                      setPin={() => setPin(event)}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="w-full lg:w-auto flex flex-1">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={10}
                  center={center}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {selectedEvents.map((event, index) => {
                    return (
                      <MarkerF
                        key={getKey(event, index, "marker")}
                        onClick={() => markerClickHandler(event)}
                        position={{
                          lat: event.location.lat,
                          lng: event.location.lng,
                        }}
                        options={{
                          title: `pin for ${event.name}`,
                          icon:
                            selectedEvent &&
                              getEventID(event) === getEventID(selectedEvent)
                              ? "/images/marker-selected.webp"
                              : "/images/marker.webp",
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
