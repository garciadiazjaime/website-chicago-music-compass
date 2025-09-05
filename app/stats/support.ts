export const getKey = (value: string) => {
  const date = new Date(value);

  return date
    .toDateString()
    .replace(/ /g, ".")
    .replace(/\.202\d/, "");
};

export class Calendar {
  timeline: Record<string, number> = {};

  constructor() {
    const today = new Date();
    const todayMinus30Days = new Date(today);
    todayMinus30Days.setDate(todayMinus30Days.getDate() - 30);

    let datePivot = new Date(todayMinus30Days);
    while (datePivot <= today) {
      const key = getKey(datePivot.toJSON());
      this.timeline[key] = 0;
      datePivot.setDate(datePivot.getDate() + 1);
    }
  }

  increment(key: string) {
    if (this.timeline[key] === undefined) {
      return;
    }

    this.timeline[key] += 1;
  }

  getValues() {
    return Object.values(this.timeline);
  }

  getLabels() {
    return Object.keys(this.timeline);
  }
}
