"use client";

const DayPicker = ({
  selectedDate,
  setSelectedDate,
  daysOfWeek,
}: {
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  daysOfWeek: string[];
}) => {
  const clickHandler = (index: number) => {
    const date = new Date();

    date.setDate(date.getDate() + index);
    setSelectedDate(date.toLocaleDateString());
  };

  const isDaySelected = (index: number) => {
    if (!selectedDate && index === 0) {
      return true;
    }

    const date = new Date();
    date.setDate(date.getDate() + index);

    return date.toLocaleDateString() === selectedDate;
  };

  return (
    <div>
      {daysOfWeek.map((day, i) => (
        <button
          key={day}
          onClick={() => clickHandler(i)}
          className={isDaySelected(i) ? "active" : ""}
        >
          {day}
        </button>
      ))}

      <style jsx>{`
        div {
          border-radius: 100px;
          background-color: rgba(29, 182, 255, 0.1);
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: space-between;
          flex-grow: 0;
          overflow: scroll;
          gap: 1rem;

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          &::-webkit-scrollbar-thumb {
            background-color: #rgba(255, 255, 255, 0);
          }
        }

        button {
          border-radius: 5px;
          padding: 10px 15px;
          border: none;
          color: white;
          font-weight: bold;
          background: none;
          cursor: pointer;

          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }

          &.active {
            background-color: rgba(225, 29, 72, 0.7);

            &:hover {
              background-color: rgba(255, 49, 92, 0.8);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default DayPicker;
