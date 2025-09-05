"use client";

import { useState, useEffect } from "react";

import Chart from "./chart";

export default function Page() {
  const [source, setSource] = useState();
  const init = async () => {
    const url = "/.netlify/functions/reports";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data) {
      setSource(data.data);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!source) {
    return <div>loading...</div>;
  }

  return (
    <section>
      <h1>Stats by Provider</h1>

      <h3>Events per Day</h3>
      <Chart source={source} field="start_date" />

      <h3>Events Updated per Day</h3>
      <Chart source={source} field="updated" />

      <h2>Events Created per Day</h2>
      <Chart source={source} field="created" />
    </section>
  );
}
