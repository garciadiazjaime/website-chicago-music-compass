import { Event } from "@/support/types";
import { loggerInfo } from "@/app/utils/logger";

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
      console.error("IndexedDB Error:", event);
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

export const populateDatabase = async (events: Event[]) => {
  try {
    const db = await openDatabase("EventsDB", 1, "events");
    await clearObjectStore(db, "events");

    events.forEach((event) => {
      const transaction = db.transaction("events", "readwrite");
      const store = transaction.objectStore("events");
      store.put(event);
    });

    loggerInfo("Database populated", { count: events.length });
  } catch (error) {
    console.error(error);
  }
};

export const setPlacesFromDatabase = async (
  setEvents: (events: Event[]) => void
) => {
  try {
    const db = await openDatabase("EventsDB", 1, "events");
    const data = await fetchAllRecords(db, "events");

    setEvents(data);
  } catch (error) {
    console.error(error);
  }
};
