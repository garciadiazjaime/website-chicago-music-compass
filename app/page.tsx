import Map from "@/app/components/Map";
import InitEvents from "@/app/components/InitEvents";
import { EventsProvider } from "@/app/context/Events";
import { tokens } from "@/app/utils/tokens";

export default async function Page() {
    return <div>
        <EventsProvider>
            <div style={{ display: "flex", backgroundColor: tokens.color.primary, color: tokens.color.white }}>
                <div style={{ width: 200, padding: "0 20px" }}>
                    <h1>Today Live Music Events</h1>
                </div>
                <div style={{ width: "100vw", height: "100vh" }}>
                    <Map />
                </div>
            </div>
            <InitEvents />
        </EventsProvider>
    </div>;
}
