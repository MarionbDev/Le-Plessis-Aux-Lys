import { addCalendar, getAllCalendar } from "@/app/api/calendar/route";
import { getAllRentals } from "@/app/api/rentals/route";
import { CalendarEvent, RentalCalendar, ReservationInput } from "@/app/types"; // Assurez-vous que le type est correctement importé
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddReservation from "./Calendar";

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
    const order = ["gite", "chambre 1", "chambre 2", "chambre 3"];
    return rentals.sort(
      (a, b) => order.indexOf(a.type) - order.indexOf(b.type),
    );
  };

  const fetchReservedDates = async (
    rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3",
  ): Promise<ReservationInput[]> => {
    try {
      const fetchedDates = await getAllCalendar(rental_type);
      // Transformez les dates récupérées si nécessaire
      const transformedDates: ReservationInput[] = fetchedDates
        .filter((date) => typeof date.id === "string") // Filtre pour s'assurer que id est une chaîne valide
        .map((date) => ({
          id: date.id as string, // Conversion de id en type string
          rental_type: date.rental_type,
          start_date: date.start_date,
          end_date: date.end_date,
        }));
      return transformedDates;
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

