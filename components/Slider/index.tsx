"use client";

import { useState } from "react";
import { SlickArrowLeft, SlickArrowRight } from "../svgs";
import { tokens } from "@/support/token";

const phrases = [
  "Your backstage pass to the City’s live music scene!",
  "Get ready to groove, discover, and connect with the beats that make our City come alive.",
  "Let’s rock this town, one gig at a time!",
];

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transition, setTransition] = useState("");
  const totalSlides = phrases.length;

  const goToPrevSlide = () => {
    setTransition("fading");
    setTimeout(() => {
      setActiveSlide((activeSlide + totalSlides - 1) % totalSlides);
      setTransition("");
    }, 500);
  };

  const goToNextSlide = () => {
    setTransition("fading");
    setTimeout(() => {
      setActiveSlide((activeSlide + 1) % totalSlides);
      setTransition("");
    }, 500);
  };

  return (
    <div
      style={{
        position: "relative",
        fontSize: "1.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <button
        onClick={goToPrevSlide}
        style={{
          background: "none",
          borderRadius: 0,
          border: "none",
          padding: 0,
          width: 40,
        }}
      >
        <SlickArrowLeft />
      </button>
      <p className={transition}>{phrases[activeSlide]}</p>
      <button
        onClick={goToNextSlide}
        style={{
          background: "none",
          borderRadius: 0,
          border: "none",
          padding: 0,
          width: 40,
        }}
      >
        <SlickArrowRight />
      </button>

      <style jsx>{`
        p {
          padding: 0;
          font-family: sans-serif;
          width: 70%;
          margin: 0 0 5px;
          text-align: center;
          transition: opacity 0.5s ease-in-out;

          @media (min-width: ${tokens.breakpoints.md}) {
            width: 40%;
          }

          @media (min-width: ${tokens.breakpoints.lg}) {
            width: 25%;
          }

          &.fading {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;
