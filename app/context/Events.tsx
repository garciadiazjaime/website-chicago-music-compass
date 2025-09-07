"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";

import { Event } from "@/app/utils/types";
import { loggerWarn } from "../utils/logger";

type EventsContextType = {
    mapLoaded: boolean;
    setMapLoaded: (loaded: boolean) => void;

    events: Event[];
    setEvents: (events: Event[]) => void;
    visibleEvents: Event[];
    setVisibleEvents: (Events: Event[]) => void;

    center: { lat: number; lng: number };
    setCenter: (center: { lat: number; lng: number }) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const CHICAGO_COORDS = { lat: 41.8781, lng: -87.6298 };
export const DEFAULT_ZOOM = 13;

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    const [events, setEvents] = useState<Event[]>([]);
    const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);

    const [center, setCenter] = useState<{ lat: number; lng: number }>(CHICAGO_COORDS);
    const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);

    useEffect(() => {
        if (!mapLoaded) {
            loggerWarn("Map is not loaded yet, skipping filter update.");
            return;
        }
    }, [mapLoaded, visibleEvents]);

    return (
        <EventsContext.Provider
            value={{
                mapLoaded,
                setMapLoaded,

                events,
                setEvents,
                visibleEvents,
                setVisibleEvents,

                center,
                setCenter,
                zoom,
                setZoom,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error("useEvents must be used within a EventsProvider");
    }
    return context;
};
