require("dotenv").config();

const EVENTS_API = `${process.env.NEXT_PUBLIC_EVENTS_API}/events`;

const logger = require("./logger.js")("mint");

module.exports.getEvents = async (query) => {
  const url = `${EVENTS_API}/?${query}`;
  logger.info("get events", { url });
  const response = await fetch(url);

  const data = await response.json();

  return data.results;
};
