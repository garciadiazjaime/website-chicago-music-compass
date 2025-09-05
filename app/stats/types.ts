export interface Event {
  fields: {
    provider: string;
    created: string;
    updated: string;
    start_date: string;
  };
}

export interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}
