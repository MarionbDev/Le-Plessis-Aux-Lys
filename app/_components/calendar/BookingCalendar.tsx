import { CustomDateRange } from "@/app/types";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
      borderRadius: "50px",
    },
    unavailable: {
      // backgroundColor: "#e5e7eb",
      color: "#c3c5c9",
      textDecoration: "line-through",
      textDecorationColor: "#a2a3a5",
    },
  };

  return (
    <>
      <DayPicker
        mode="range"
        locale={fr}
        numberOfMonths={2}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        // disabled={reservedDates}
        className="text-slate-600 h-[17rem] text-sm  "
      />
    </>
  );
}

