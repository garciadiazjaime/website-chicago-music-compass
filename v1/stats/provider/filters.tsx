"use client";

import { useState } from "react";

import { pubSubInstance } from "./support";

const CheckBox = (props: { value: boolean; onClick: () => void }) => {
  return (
    <div
      style={{
        minWidth: 42,
        width: 42,
        height: 42,
        border: "2px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 38,
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={props.onClick}
    >
      {props.value && <>✔️</>}
    </div>
  );
};

export default function Filters(props: { providers: Record<string, number> }) {
  const initial = Object.keys(props.providers).reduce(
    (accumulator: Record<string, boolean>, value) => {
      accumulator[value] = true;
      return accumulator;
    },
    {}
  );
  const [options, setOptions] = useState<Record<string, boolean>>(initial);
  const [open, setOpen] = useState(false);

  const boxClickHandler = (item: string) => {
    const newOptions = { ...options };
    newOptions[item] = !newOptions[item];

    setOptions(newOptions);
    pubSubInstance.publish(newOptions);
  };

  const labelClickHandler = (item: string) => {
    const newOptions = { ...options };
    Object.keys(newOptions).map((key) => {
      newOptions[key] = false;
    });
    newOptions[item] = true;

    setOptions(newOptions);
    pubSubInstance.publish(newOptions);
  };

  const allClickHandler = () => {
    const newOptions = { ...options };
    Object.keys(newOptions).map((key) => {
      newOptions[key] = true;
    });

    setOptions(newOptions);
    pubSubInstance.publish(newOptions);
  };

  const toggleClickHandler = () => {
    setOpen(!open);
  };

  const providersSorted = Object.keys(props.providers)
    .reduce((accumulator: [string, number][], key: string) => {
      accumulator.push([key, props.providers[key]]);

      return accumulator;
    }, [])
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1]);

  return (
    <div
      style={{
        userSelect: "none",
        position: "relative",
        background: "white",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          height: 42,
          display: "flex",
          alignItems: "center",
          fontSize: 38,
        }}
        onClick={toggleClickHandler}
      >
        {open ? `✖️` : `⚙️`}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 40,
            background: "white",
            opacity: 0.9,
          }}
        >
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderBottom: "1px solid #000",
              marginBottom: 6,
            }}
            onClick={allClickHandler}
          >
            All
          </div>
          <div>
            {providersSorted.map(([key, total]: [string, number]) => {
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 6,
                  }}
                >
                  <CheckBox
                    value={options[key]}
                    onClick={() => boxClickHandler(key)}
                  />
                  <div
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 12,
                      height: 42,
                      width: 200,
                      overflow: "hidden",
                      lineHeight: "50px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => labelClickHandler(key)}
                  >
                    <span>{key.toLowerCase().replace(/_/g, " ")} </span>
                    <span>{total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
