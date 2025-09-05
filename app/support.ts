import { Event } from "@/support/types";

export const getEventWithDateAndTime = (event: Event) => {
  const startDate = new Date(event.start_date);

  return {
    ...event,
    date: startDate.toLocaleDateString(),
    time: startDate.toTimeString().split(":")[0].replace("00", "24"),
  };
};

export const getGenerativeMetadata = (events: Event[]) => {
  const invalidGenres = ["Music", "Variety"];
  const invalidSubGenres = ["Unspecified"];

  const countByGenre = events.reduce(
    (acc: { [key: string]: number }, event) => {
      const value = event.generativemetadata_set?.[0]?.genre;
      if (!value) {
        return acc;
      }

      let genre = value;

      if (invalidGenres.includes(genre)) {
        genre = event.generativemetadata_set?.[0]?.subgenre;
      }

      if (invalidSubGenres.includes(genre)) {
        genre = event.generativemetadata_set?.[0]?.type;
      }

      if (!genre) {
        return acc;
      }

      if (!acc[genre]) {
        acc[genre] = 0;
      }

      acc[genre] += 1;

      return acc;
    },
    {}
  );
  const genres = Object.keys(countByGenre)
    .map((genre) => [genre, countByGenre[genre]])
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const countBySubGenres = events.reduce(
    (acc: { [key: string]: number }, event) => {
      const subGenre = event.generativemetadata_set?.[0]?.subgenre;
      if (!subGenre) {
        return acc;
      }

      if (!acc[subGenre]) {
        acc[subGenre] = 1;
      }

      acc[subGenre] += 1;

      return acc;
    },
    {}
  );
  const subGenres = Object.keys(countBySubGenres)
    .map((subGenre) => [subGenre, countBySubGenres[subGenre]])
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const countByTypes = events.reduce(
    (acc: { [key: string]: number }, event) => {
      const type = event.generativemetadata_set?.[0]?.type;
      if (!type) {
        return acc;
      }

      if (!acc[type]) {
        acc[type] = 1;
      }

      acc[type] += 1;

      return acc;
    },
    {}
  );

  const types = Object.keys(countByTypes)
    .map((type) => [type, countByTypes[type]])
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  return {
    genres,
    subGenres,
    types,
  };
};
