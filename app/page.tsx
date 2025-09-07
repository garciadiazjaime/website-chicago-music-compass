import Link from "next/link";

import Map from "@/app/components/Map";
import InitEvents from "@/app/components/InitEvents";
import { EventsProvider } from "@/app/context/Events";
import { tokens } from "@/app/utils/tokens";
import Filters from "@/app/components/Filters";

export default async function Page() {
    return <div>
        <EventsProvider>
            <div style={{ display: "flex", backgroundColor: tokens.color.primary, color: tokens.color.white }}>
                <div style={{ width: 200, padding: "0 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-between" }}>
                        <div>
                            <h1>Today Live Music Events</h1>
                            <Filters />
                        </div>
                        <div style={{ padding: 20 }}>
                            <Link href="/about" style={{ fontSize: 26, color: tokens.color.white }}>About</Link>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100vw", height: "100vh" }}>
                    <Map />
                </div>
            </div>
            <InitEvents />
        </EventsProvider>
    </div>;
}
