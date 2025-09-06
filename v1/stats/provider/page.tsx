"use client";

import { useState, useEffect } from "react";

import { getProviders, getLabels, getColors } from "./support";
import Chart from "./chart";
import Filters from "./filters";

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

  const providers = getProviders(source);
  const labels = getLabels();
  const colors = getColors(providers);

  return (
    <section>
      <h1>Stats by Provider</h1>

      <Filters providers={providers} />

      <Chart
        title="Events Created per Day"
        field="created"
        source={source}
        labels={labels}
        colors={colors}
      />

      <Chart
        title="Events Updated per Day"
        field="updated"
        source={source}
        labels={labels}
        colors={colors}
      />

      <Chart
        title="Events per Day"
        field="start_date"
        source={source}
        labels={labels}
        colors={colors}
      />
    </section>
  );
}
