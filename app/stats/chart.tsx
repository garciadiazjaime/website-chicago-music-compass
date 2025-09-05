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

import { Event, Dataset } from "./types";
import colors from "./colors";
import { getKey, Calendar } from "./support";

export default function Chart(props: {
  source: Event[];
  field: "created" | "updated" | "start_date";
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
        display: false,
      },
    },
  };

  const processData = () => {
    const calendar = new Calendar();

    props.source.map((item) => {
      const key = getKey(item.fields[props.field]);

      calendar.increment(key);
    });

    const datasets = [
      {
        label: "",
        data: calendar.getValues(),
        fill: false,
        borderColor: colors[1],
        tension: 0.1,
      },
    ];

    setPoints({
      labels: calendar.getLabels(),
      datasets,
    });
  };

  useEffect(() => {
    processData();
  }, []);

  return <>{points && <Line options={options} data={points} />}</>;
}
