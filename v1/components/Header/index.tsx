import Image from "next/image";
import { Logo } from "../svgs";
import { useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Props {
  currentDay: number;
  setSelectedDate: (newDate: Date) => void;
}

const Header = ({ currentDay, setSelectedDate }: Props) => {
  const [activeDay, setActiveDay] = useState(currentDay);

  const dateHandler = (event: any) => {
    const diff = event.target.value - currentDay;
    const today = new Date();
    today.setDate(today.getDate() + diff);

    setSelectedDate(today);
  };

  const handleClick = (e: any, i: number) => {
    dateHandler(e);
    setActiveDay(i);
  }

  return <header className="my-5 bg-blue-500/10 flex justify-between pl-2">
    <h1 className="text-sky-400 flex items-center uppercase text-2xl md:text-3xl italic font-black gap-2">
      <div className="w-16"><Logo /></div>Chicago
    </h1>
    <select
      className="h-full bg-rose-600 text-white italic font-semibold text-xl md:text-2xl rounded-none lg:hidden"
      onChange={dateHandler}
    >
      {days.map((day, index) => (
        <option value={index} key={`${index}-${day}`} disabled={index < currentDay}>
          {currentDay === index ? "Today" : day}
        </option>

      ))}
    </select>
    <div className="h-full hidden lg:flex">
      {days.map((day, index) => (
        index >= currentDay && (
          <button
          className={`${activeDay === index ? 'bg-rose-600' : 'hover:bg-blue-500/10'} flex items-center text-white px-3 italic font-semibold opacity-90 hover:opacity-100`}
          value={index} key={`${day}-${index}`} onClick={(e) => handleClick(e, index)}>
          {currentDay === index ? "Today" : day}
        </button>
      )))}
    </div>
</header>
}
export default Header;
