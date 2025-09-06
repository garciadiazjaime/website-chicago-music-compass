"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Provider, pubSubInstance } from "./support";
import { Event, Dataset } from "../types";

export default function Chart(props: {
  title: string;
  field: "created" | "updated" | "start_date";
  source: Event[];
  labels: string[];
  colors: Record<string, string>;
}) {
  const [points, setPoints] = useState<{
    labels: string[];
    datasets: Dataset[];
  }>();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const processData = (payload?: Record<string, boolean>) => {
    const providers: Record<string, Provider> = {};

    props.source.map((item) => {
      if (payload?.[item.fields.provider] === false) {
        return;
      }

      if (!providers[item.fields.provider]) {
        providers[item.fields.provider] = new Provider(item.fields.provider);
      }

      providers[item.fields.provider].addEvent(item.fields[props.field]);
      providers[item.fields.provider].setTimeLine();
    });

    const datasets = Object.keys(providers).map((key) => {
      const p = providers[key];

      return {
        label: p.getName(),
        data: p.getData(),
        fill: false,
        borderColor: props.colors[key],
        tension: 0.1,
      };
    });

    setPoints({
      labels: props.labels,
      datasets,
    });
  };

  const init = () => {
    pubSubInstance.subscribe((payload: Record<string, boolean>) => {
      processData(payload);
    });
  };

  useEffect(() => {
    processData();
    init();
  }, []);

  return <>{points && <Line options={options} data={points} />}</>;
}
