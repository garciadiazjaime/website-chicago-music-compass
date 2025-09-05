const fs = require("fs");

const csv = require("csvtojson");

const logger = require("./logger.js")("genres");

// genres extracted from wikipedia and manually added to genre.csv
// https://en.wikipedia.org/wiki/List_of_music_genres_and_styles

async function main() {
  logger.info("reset starting");

  const genres = await csv({
    noheader: true,
    output: "csv",
  }).fromFile("./public/genre.csv");

  const payload = genres.reduce(
    (accu, genre) => {
      if (!genre.length) {
        return accu;
      }

      const parent = genre[0].toLowerCase();
      const value = genre[1].toLowerCase();

      accu.nodes[value] = parent;

      if (!accu.parents[parent]) {
        accu.parents[parent] = 0;
      }
      accu.parents[parent] += 1;

      return accu;
    },
    { nodes: {}, parents: {} }
  );

  fs.writeFileSync(`./public/genres.json`, JSON.stringify(payload, null, 2));

  logger.info(`genres reset`);
}

main().then(() => {
  logger.info("reset end");
  logger.flush;
});
