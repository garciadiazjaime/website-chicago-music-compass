'use client';

import { useEffect } from "react";

import { populateDatabase, setPlacesFromDatabase } from "@/app/utils/database";
import { useEvents } from "@/app/context/Events";

export default function InitEvents() {
    const { setEvents } = useEvents();

    useEffect(() => {
        const init = async () => {
            await populateDatabase();
            setPlacesFromDatabase(setEvents)
        }

        init()
    }, [setEvents]);

    return <></>;
}
