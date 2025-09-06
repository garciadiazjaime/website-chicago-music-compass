"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

import { useEvents } from "@/app/context/Events";
import { loggerInfo } from "../utils/logger";

export default function Map() {
    const {
        events,
        setVisibleEvents,
        setMapLoaded
    } = useEvents();

    const mapRef = useRef<google.maps.Map | null>(null);

    const [center] = useState({
        lat: 41.8777569,
        lng: -87.6271142,
    });

    const handleOnLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        setMapLoaded(true);
    };

    const updateVisibleEvents = useCallback(() => {
        if (!mapRef.current) {
            return;
        }

        const bounds = mapRef.current.getBounds()
        if (bounds) {
            const visible = events.filter((event) =>
                bounds.contains(new google.maps.LatLng(event.location.lat, event.location.lng))
            );
            loggerInfo(`Visible events`, { count: visible.length });
            setVisibleEvents(visible);
        }
    }, [events, setVisibleEvents]);

    useEffect(() => {
        updateVisibleEvents();
    }, [events, updateVisibleEvents]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS!}>
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    center={center}
                    zoom={16}
                    onLoad={handleOnLoad}
                    onTilesLoaded={updateVisibleEvents}
                    onCenterChanged={updateVisibleEvents}
                    onZoomChanged={updateVisibleEvents}
                >
                    {events.map((event, index) => (
                        <Marker
                            key={index}
                            position={{ lat: event.location.lat, lng: event.location.lng }}
                            title={event.name}
                            icon={"/images/marker.webp"}
                        />
                    ))}
                </GoogleMap>
            </LoadScriptNext>
        </div>
    );
};
