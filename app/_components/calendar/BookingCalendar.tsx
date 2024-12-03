import { CustomDateRange } from "@/app/types";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import classNames from "react-day-picker/style.module.css";

type BookingCalendarProps = {
  reservedDates: CustomDateRange[];
};

export default function BookingCalendar({
  reservedDates,
}: BookingCalendarProps) {
  const modifiers = {
    reserved: reservedDates
      .filter((date) => date.type === "reserve")
      .map(({ from, to }) => ({ from, to })),
    unavailable: reservedDates
      .filter((date) => date.type === "indisponible")
      .map(({ from, to }) => ({ from, to })),
  };

  const modifiersStyles = {
    reserved: {
      backgroundColor: "#db3636",
      color: "#ffffff",
      borderRadius: "15px",
    },
    unavailable: {
      // backgroundColor: "#e5e7eb",
      color: "#c3c5c9",
      textDecoration: "line-through",
      textDecorationColor: "#a2a3a5",
    },
  };

  return (
    <div className=" ">
      <DayPicker
        mode="range"
        locale={fr}
        numberOfMonths={1}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="day-picker-mobile  text-slate-600 text-md md:text-sm  "
        style={{
          width: "200px",
        }}
      />
      <DayPicker
        mode="range"
        locale={fr}
        numberOfMonths={2}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="day-picker-desktop calendar-size text-slate-600 h-[17rem]   "
      />
    </div>
  );
}

