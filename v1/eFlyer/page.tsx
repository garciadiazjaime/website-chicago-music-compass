"use client";
import RGBKineticSliderComponent, {
  startRecording,
} from "@/v1/components/RGBKineticSliderComponent";
import SegmentedWheel from "@/v1/components/SegmentedWheel";
import MusicRecord from "@/v1/components/MusicRecord";

const EFlyer = () => {
  const events: any = [];
  const top5 = events.slice(0, 5);
  const images = top5.map((event: any) => event.image);
  const texts = top5.map((event: any) => [event.name, event.location.name]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center bg-black text-white py-6 flex flex-row gap-6 justify-center items-center">
        eFlyer recorder
        <button
          onClick={startRecording}
          id="playSlider"
          className="bg-white text-red-500 rounded-md p-4 ml-4 hover:scale-105 transition-all"
        >
          Create video
        </button>
        <SegmentedWheel numberOfSegments={7} innerRadius={30} />
        <MusicRecord numberOfCircles={10} />
      </h1>
      <RGBKineticSliderComponent images={images} texts={texts} />
    </div>
  );
};
export default EFlyer;
