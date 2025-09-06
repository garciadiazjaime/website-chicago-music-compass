'use client';

import { useEffect } from "react";

import { getEvents } from "@/app/utils/actions";
import { populateDatabase, setPlacesFromDatabase } from "@/app/utils/database";
import { useEvents } from "@/app/context/Events";

export default function InitEvents() {
    const { setEvents } = useEvents();

    useEffect(() => {
        const init = async () => {
            const events = await getEvents();
            await populateDatabase(events);
            setPlacesFromDatabase(setEvents)
        }

        init()
    }, [setEvents]);

    return <></>;
}
