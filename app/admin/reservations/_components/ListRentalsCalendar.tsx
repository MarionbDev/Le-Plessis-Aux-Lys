"use client";

import { getAllCalendar } from "@/app/api/calendar/route";
import { useEffect, useState } from "react";
import CalendarRentalsCardAdmin from "./Calendar";

type RentalCalendar = {
  id: string;
  name: string;
  type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
};

export default function ListRentalsCalendar() {
  const [rentalsCalendar, setRentalsCalendar] = useState<RentalCalendar[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsData = await getAllCalendar();
        const sortedRentalsCalendar = sortRentalsCalendar(rentalsData);
        setRentalsCalendar(sortedRentalsCalendar);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const sortRentalsCalendar = (rentals: RentalCalendar[]) => {
    return rentals.sort((a, b) => {
      const order = ["gîte", "chambre 1", "chambre 2", "chambre 3"];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center my-20">
        <CalendarRentalsCardAdmin

        // id={rentalCalendar.id}
        // nameRental={rentalCalendar.type}
        />
      </div>
    </>
  );
}

