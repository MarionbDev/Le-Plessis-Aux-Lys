import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingCalendar() {
  const initialRange: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  return (
    <>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="text-slate-600 "
      />
    </>
  );
}

