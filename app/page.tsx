import Map from "@/app/components/Map";
import InitEvents from "@/app/components/InitEvents";
import { EventsProvider } from "@/app/context/Events";


export default async function Page() {
    return <div>
        <EventsProvider>
            <div style={{ width: "100vw", height: "100vh" }}>
                <Map />
            </div>
            <InitEvents />
        </EventsProvider>
    </div>;
}
