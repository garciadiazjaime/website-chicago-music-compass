'use client';

import { useEvents, CHICAGO_COORDS, DEFAULT_ZOOM } from "@/app/context/Events";
import { loggerError } from "../utils/logger";
import { tokens } from "@/app/utils/tokens";

export default function Filters() {
    const { setCenter, setZoom } = useEvents();

    const handleNearMeClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                    setZoom(15)
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        loggerError("Location access denied. Please enable location services in your browser.");
                        alert("Location access denied. Please enable location services in your browser settings.");
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        loggerError("Location information is unavailable.");
                        alert("Location information is unavailable. Please try again later.");
                    } else if (error.code === error.TIMEOUT) {
                        loggerError("The request to get your location timed out.");
                        alert("The request to get your location timed out. Please try again.");
                    } else {
                        loggerError("An unknown error occurred while fetching location.", { error });
                        alert("An unknown error occurred while fetching your location. Please try again.");
                    }
                }
            );
        } else {
            loggerError("Geolocation is not supported by this browser.");
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleChicagoClick = () => {
        setCenter(CHICAGO_COORDS);
        setZoom(DEFAULT_ZOOM)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <button
                onClick={handleNearMeClick}
                style={{
                    backgroundColor: tokens.color.lightBlue,
                    color: tokens.color.white,
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                Near Me
            </button>

            <button
                onClick={handleChicagoClick}
                style={{
                    backgroundColor: tokens.color.lightBlue,
                    color: tokens.color.white,
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                Chicago
            </button>
        </div>
    );
}
