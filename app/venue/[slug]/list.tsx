"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { getMiles } from "./support";
import { LocationChart } from "@/support/types";
import { LMSocialMediaLinks } from "@/components/SocialMediaLinks";

import { tokens } from "@/support/token";
import styles from "./page.module.css";

export default function List({ neighbors }: { neighbors: LocationChart[] }) {
  const [items, setItems] = useState<LocationChart[]>([]);
  const [showItems, setShowItems] = useState(false);

  const appendItem = (index = 0) => {
    if (index >= neighbors.length) {
      return;
    }

    setItems([...neighbors.slice(0, index + 1)]);

    setTimeout(() => {
      appendItem(index + 1);
    }, 400);
  };

  useEffect(() => {
    if (!showItems) {
      return;
    }

    appendItem();
  }, [showItems]);

  const showItemsHandler = () => {
    setShowItems(true);
  };

  return (
    <>
      <h2 style={{ marginTop: 40 }}>
        Do you know how many events your neighbors have?
      </h2>
      {!showItems && (
        <button
          onClick={showItemsHandler}
          style={{
            border: "1px solid white",
            padding: "0 40px",
            marginTop: 60,
            width: "100%",
          }}
        >
          Click here to reveal
        </button>
      )}
      {showItems && (
        <div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: 40,
            }}
          >
            <li style={{ display: "flex", color: tokens.color.blue }}>
              <div style={{ width: "60%" }}>Neighbor</div>
              <div style={{ flex: 1 }}>Events</div>
              <div style={{ flex: 1 }}>Miles</div>
            </li>

            {items.map((item) => (
              <li
                key={item.id}
                style={{ display: "flex" }}
                className={styles.neighbor}
              >
                <div style={{ width: "60%" }}>
                  <Link
                    href={`/venue/${item.slug}`}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {item.slug}
                  </Link>
                </div>
                <div style={{ flex: 1 }}>{item.events}</div>
                <div style={{ flex: 1 }}>
                  {getMiles((item.distance || 0) * 1000).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          {items.length === neighbors.length && (
            <div style={{ marginTop: 40 }}>
              <p style={{ color: tokens.color.blue }}>
                you want more data? send us a line
              </p>
              <LMSocialMediaLinks />
            </div>
          )}
        </div>
      )}
    </>
  );
}
