import Image from "next/image";
import { Event } from "../../support/types";
import SocialLinks from "../socialLinks";
import ShareDialog from "../ShareDialog";
import { useState } from "react";
import { Chevron, Close, Directions, Pin, PinActive, Share } from "../svgs";

interface Props {
  event: Event;
  selected: boolean | undefined;
  setPin: () => void;
}

const EventCard = ({ event, selected = false, setPin }: Props) => {
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const getImage = (event: Event): string => {
    const artist = event.artists?.find((artist) => artist.metadata?.image);
    if (artist) {
      return artist.metadata?.image || "";
    }

    if (event.location?.metadata?.image) {
      return event.location.metadata.image;
    }

    return event.image;
  };

  const directionsClickHandler = (event: Event) => {
    window.open(event.location.url, "_blank");
  };

  const gotoEventPage = (event: Event) => window.open(event.url, "_blank");
  return (
    <div
      className={`flex relative flex-col w-full h-full items-end group ${
        selected
          ? "bg-gradient-to-r  to-blue-950 from-red-950"
          : "group-hover:bg-blue-500/20 bg-gradient-to-t from-blue-500/20 to-transparent"
      }`}
    >
      {selected && (
        <div className={`absolute flex w-full h-full`}>
          <div className="border border-rose-500 w-full my-3 lg:m-1"></div>
        </div>
      )}
      <div className="flex gap-0 w-full relative">
        <div className="flex items-end font-bold text-sky-300  text-3xl pb-2 px-4 mb-10">
          {`
          ${new Date(event.start_date).toLocaleTimeString().split(":")[0]}
            `}
          <span className="text-base">PM</span>
        </div>
        <strong className="absolute left-0 bottom-0 text-white z-30 bg-rose-600 text-base mb-4 px-4 italic">
          {event.location.name}
        </strong>
        <div className="flex overflow-hidden w-full justify-center">
          <Image
            src={getImage(event)}
            height={0}
            width={0}
            className="h-28 w-auto"
            alt={event.name}
          />
          <Image
            src={getImage(event)}
            height={0}
            width={0}
            className="h-28 w-auto"
            alt={event.name}
          />
          <Image
            src={getImage(event)}
            height={0}
            width={0}
            className="h-28 w-auto"
            alt={event.name}
          />
          <Image
            src={getImage(event)}
            height={0}
            width={0}
            className="h-28 w-auto"
            alt={event.name}
          />
          <Image
            src={getImage(event)}
            height={0}
            width={0}
            className="h-28 w-auto"
            alt={event.name}
          />
        </div>
        <div
          className={`w-16 h-32 flex flex-col transition-all duration-300 ${
            !selected && "lg:opacity-20 group-hover:opacity-100"
          } `}
        >
          <button
            onClick={setPin}
            className={`flex justify-center grow items-center ${
              selected ? "bg-rose-600" : "bg-sky-300/60 hover:bg-sky-300"
            }`}
            aria-label={`pin for ${event.name}`}
          >
            <div className="w-4">
              {selected ? <PinActive /> : <Pin />}
            </div>
          </button>
          <div
            className={`flex justify-center items-center grow opacity-60 hover:opacity-100 relative cursor-pointer`}
            onClick={() => setOpenShareDialog(!openShareDialog)}
          >
            <div className="w-4">
              {openShareDialog ? <Close /> : <Share />}
            </div>
            <ShareDialog
              url={`https://livemusic.mintitmedia.com/chicago/events#${event.slug}`}
              open={openShareDialog}
              setOpen={setOpenShareDialog}
            />
          </div>
          <button
            onClick={() => directionsClickHandler(event)}
            className={`flex justify-center items-center grow opacity-60 hover:opacity-100`}
            aria-label={`google maps link for ${event.name}`}
          >
            <div className="w-4">
              <Directions />
            </div>
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col w-full items-stretch grow text-white relative`}
      >
        <button onClick={() => gotoEventPage(event)}>
          <h2 className="cursor-pointer capitalize text-left pl-4 py-6 pb-2 pr-8 text-2xl font-bold text-overflow-elipsis flex justify-between items-center lg:opacity-80 lg:hover:opacity-100">
            <span className="line-clamp-2">{event.name.toLowerCase()}</span>
            <div className="w-8 ml-4 flex-shrink-0">
              <Chevron />
            </div>
          </h2>
        </button>
        <div
          className={`flex transition-all duration-300 ${
            !selected && "lg:opacity-20 lg:group-hover:opacity-100"
          }`}
        >
          <SocialLinks event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
