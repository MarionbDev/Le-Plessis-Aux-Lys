import { addCalendar, getAllCalendar } from "@/app/api/calendar/route";
import { getAllRentals } from "@/app/api/rentals/route";
import { CalendarEvent } from "@/app/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddReservation from "./Calendar";

type RentalCalendar = {
  id: string;
  name: string;
  type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
  rental_id: string;
};

const ListRentalsCalendar: React.FC = () => {
  const [rentalsCalendar, setRentalsCalendar] = useState<RentalCalendar[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsData = await getAllRentals();
        const sortedRentalsCalendar = sortRentalsCalendar(rentalsData);
        setRentalsCalendar(sortedRentalsCalendar);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const sortRentalsCalendar = (rentals: RentalCalendar[]) => {
    const order = ["gîte", "chambre 1", "chambre 2", "chambre 3"];
    return rentals.sort(
      (a, b) => order.indexOf(a.type) - order.indexOf(b.type),
    );
  };

  const fetchReservedDates = async (
    rental_type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3",
  ) => {
    try {
      const fetchedDates = await getAllCalendar(rental_type);
      return fetchedDates;
    } catch (error) {
      console.error(`Error fetching reserved dates for ${rental_type}:`, error);
      throw error;
    }
  };

  const handleAddCalendarEvent = async (event: CalendarEvent) => {
    try {
      await addCalendar(event);
      toast.success("Réservation ajoutée avec succès !");
    } catch (error) {
      console.error("Error adding calendar event:", error);
      toast.error("Erreur lors de l'ajout de la réservation !");
    }
  };

  return (
    <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center my-20">
      {rentalsCalendar.map((rental) => (
        <div key={rental.id}>
          <p>{rental.type}</p>
          <AddReservation
            rentalType={rental.type}
            fetchReservedDates={fetchReservedDates}
            addCalendarEvent={handleAddCalendarEvent}
          />
        </div>
      ))}
    </div>
  );
};

export default ListRentalsCalendar;

