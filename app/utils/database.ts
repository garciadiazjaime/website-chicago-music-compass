import { Event } from "@/app/utils/types";
import { loggerInfo, loggerError } from "@/app/utils/logger";
import { getEvents } from "@/app/utils/actions";

export const openDatabase = (
  dbName: string,
  version: number,
  objectStoreName: string
) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const dbRequest = indexedDB.open(dbName, version);

    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result;
      if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    dbRequest.onsuccess = () => {
      resolve(dbRequest.result);
    };

    dbRequest.onerror = (event) => {
      loggerError("error opening database", { event });
      reject(new Error("Error opening IndexedDB"));
    };
  });
};

export const fetchAllRecords = (db: IDBDatabase, objectStoreName: string) => {
  return new Promise<Event[]>((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, "readonly");
    const store = transaction.objectStore(objectStoreName);

    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result as Event[]);
    };

    request.onerror = () => {
      reject([]);
    };
  });
};

export const fetchTodayRecords = (
  db: IDBDatabase,
  objectStoreName: string,
  filterByDate: string
) => {
  return new Promise<Event[]>((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, "readonly");
    const store = transaction.objectStore(objectStoreName);

    const request = store.getAll();
    request.onsuccess = () => {
      const events = (request.result as Event[]).filter((event) => {
        const eventDate = new Date(event.start_date).toLocaleDateString();
        return eventDate === filterByDate;
      });
      resolve(events);
    };

    request.onerror = () => {
      reject([]);
    };
  });
};

const clearObjectStore = (db: IDBDatabase, objectStoreName: string) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, "readwrite");
    const store = transaction.objectStore(objectStoreName);

    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
      resolve();
    };

    clearRequest.onerror = () => {
      reject(new Error("Error clearing object store"));
    };
  });
};

export const populateDatabase = async () => {
  const lastUpdate = localStorage.getItem("cmc_db_last_updated");
  if (lastUpdate) {
    const lastUpdateDate = new Date(lastUpdate);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - lastUpdateDate.getTime()) / 36e5;
    if (diffInHours < 24) {
      loggerInfo("Database recently updated, skipping population");
      return;
    }
  }

  loggerInfo("fetching events from server");
  const events: Event[] = await getEvents();

  try {
    const db = await openDatabase("EventsDB", 1, "events");
    await clearObjectStore(db, "events");

    events.forEach((event) => {
      const transaction = db.transaction("events", "readwrite");
      const store = transaction.objectStore("events");
      store.put(event);
    });

    localStorage.setItem("cmc_db_last_updated", new Date().toISOString());

    loggerInfo("Database populated", { count: events.length });
  } catch (error) {
    loggerError("error populating database", { error });
  }
};

export const setPlacesFromDatabase = async (
  setEvents: (events: Event[]) => void
) => {
  try {
    const db = await openDatabase("EventsDB", 1, "events");

    const today = new Date().toLocaleDateString();
    const data = await fetchTodayRecords(db, "events", today);
    loggerInfo("events found for today", { count: data.length });
    setEvents(data);
  } catch (error) {
    loggerError("error fetching database", { error });
  }
};
