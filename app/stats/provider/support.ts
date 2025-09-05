import { Event } from "../types";
import colors from "../colors";
import { Calendar, getKey } from "../support";

export class Provider {
  name = "";
  calendar = new Calendar();
  timeline: number[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addEvent(dateTime: string) {
    const key = getKey(dateTime);
    this.calendar.increment(key);
  }

  setTimeLine() {
    this.timeline = Object.values(this.calendar.timeline);
  }

  getLabels() {
    return Object.keys(this.calendar.timeline);
  }

  getName() {
    return this.name;
  }

  getData() {
    return Object.values(this.calendar.timeline);
  }
}

export const getProviders = (source: Event[]) => {
  const providers: Record<string, number> = {};

  source.map((item: Event) => {
    if (!providers[item.fields.provider]) {
      providers[item.fields.provider] = 0;
    }

    providers[item.fields.provider] += 1;
  });

  return providers;
};

export const getLabels = () => {
  const calendar = new Calendar();

  return calendar.getLabels();
};

export const getColors = (providers: Record<string, number>) => {
  const response: Record<string, string> = {};

  Object.keys(providers).map((key, index) => {
    response[key] = colors[index];
  });

  return response;
};

export class PubSub {
  subscribers = <any>[];

  subscribe(subscriber: Function) {
    this.subscribers = [...this.subscribers, subscriber];
  }

  publish(payload: any) {
    this.subscribers.forEach((subscriber: any) => subscriber(payload));
  }
}

export const pubSubInstance = new PubSub();
