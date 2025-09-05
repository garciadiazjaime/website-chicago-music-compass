import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    images: string[];
    TweenMax: any;
    PIXI: any;
    rgbKineticSlider: any;
    webkitAudioContext: any;
  }
  interface Element {
    captureStream: any;
  }
}

interface RGBKineticSliderProps {
  images: string[];
  texts: string[][];
}

const RGBKineticSliderComponent: React.FC<RGBKineticSliderProps> = ({
  images,
  texts,
}) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [sliderInstance, setSliderInstance] = useState<any>(null);
  useEffect(() => {
    const loadScript = (src: string, callback: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
    };
    window.images = images;

    // Load local PIXI script
    loadScript("/js/pixi.min.js", () => {
      // Load local TweenMax script
      loadScript("/js/TweenMax.min.js", () => {
        // Load local RGBKineticSlider script
        loadScript("/js/rgbKineticSlider.js", () => {
          setScriptsLoaded(true);
        });
      });
    });

    // Cleanup when the component is unmounted
    return () => {
      // Remove script tags if needed
    };
  }, [images]);

  useEffect(() => {
    // Initialize RGBKineticSlider when the scripts are loaded
    if (
      scriptsLoaded &&
      window.rgbKineticSlider &&
      window.PIXI &&
      window.TweenMax
    ) {
      const slider = new window.rgbKineticSlider({
        // images and content sources
        slideImages: images, // array of images >demo size : 1920 x 1080
        itemsTitles: texts, // array of titles / subtitles

        // displacement images sources
        backgroundDisplacementSprite: "/video-effects/map-9.jpg", // slide displacement image
        cursorDisplacementSprite: "/video-effects/displace-circle.png", // cursor displacement image

        // cursor displacement effect
        cursorImgEffect: true, // enable cursor effect
        cursorTextEffect: false, // enable cursor text effect
        cursorScaleIntensity: 0.65, // cursor effect intensity
        cursorMomentum: 0.14, // lower is slower

        // swipe
        swipe: true, // enable swipe
        swipeDistance: window.innerWidth * 0.4, // swipe distance - ex : 580
        swipeScaleIntensity: 2, // scale intensity during swipping

        // slide transition
        slideTransitionDuration: 1, // transition duration
        transitionScaleIntensity: 30, // scale intensity during transition
        transitionScaleAmplitude: 160, // scale amplitude during transition

        // regular navigation
        nav: true, // enable navigation
        navElement: ".main-nav", // set nav class

        // image rgb effect
        imagesRgbEffect: true, // enable img rgb effect
        imagesRgbIntensity: 0.9, // set img rgb intensity
        navImagesRgbIntensity: 80, // set img rgb intensity for regular nav

        // texts settings
        textsDisplay: true, // show title
        textsSubTitleDisplay: true, // show subtitles
        textsTiltEffect: true, // enable text tilt
        googleFonts: ["Josefin Sans:700", "Poppins:400"], // select google font to use
        buttonMode: false, // enable button mode for title
        textsRgbEffect: true, // enable text rgb effect
        textsRgbIntensity: 0.03, // set text rgb intensity
        navTextsRgbIntensity: 15, // set text rgb intensity for regular nav

        textTitleColor: "#fff", // title color
        textTitleSize: 30, // title size
        mobileTextTitleSize: 125, // title size
        textTitleLetterspacing: 3, // title letterspacing

        textSubTitleColor: "white", // subtitle color ex : 0x000000
        textSubTitleSize: 20, // subtitle size
        mobileTextSubTitleSize: 21, // mobile subtitle size
        textSubTitleLetterspacing: 2, // subtitle letter spacing
        textSubTitleOffsetTop: 200, // subtitle offset top
        mobileTextSubTitleOffsetTop: 90, // mobile subtitle offset top
      });

      setSliderInstance(slider);

      // Start recording after the slider is initialized

      // Cleanup when the component is unmounted
      return () => {
        if (sliderInstance && sliderInstance.destroy) {
          sliderInstance.destroy();
        }
      };
    }
  }, [scriptsLoaded, images, texts, sliderInstance]);

  return <div id="rgbKineticSlider" className="rgbKineticSlider" />;
};

// Function to export video
const exportVid = (blob: Blob) => {
  const vid = document.createElement("video");
  vid.style.width = "30%";
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);

  const a = document.createElement("a");
  a.download = "myvid.webm";
  a.href = vid.src;
  a.textContent = "download the video";
  document.body.appendChild(a);
};

export const startRecording = () => {
  const chunks: BlobPart[] = [];
  const canvas = document.querySelector("#rgbKineticSlider canvas");

  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  // Load your audio file
  const audioElement = new Audio("/audio/music_sample.mp3");

  // Listen for the canplay event before starting recording
  audioElement.addEventListener("canplay", () => {
    console.log("Audio can play");

    const stream = canvas.captureStream();

    const audioStream = audioElement.captureStream();

    // Add the audio track to the video stream
    stream.addTrack(audioStream.getAudioTracks()[0]);

    const rec = new MediaRecorder(stream);

    // Connect the audio to the media recorder
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      exportVid(new Blob(chunks, { type: "video/webm" }));
      audioElement.pause();
    };

    // Start playing the audio and recording simultaneously
    audioElement.play();
    rec.start();

    setTimeout(() => {
      rec.stop();
    }, 3000 * 5);
  });
};

export default RGBKineticSliderComponent;
