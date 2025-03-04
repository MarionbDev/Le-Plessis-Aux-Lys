"use client";
import {
  addCalendar,
  deleteCalendar,
  getAllCalendar,
} from "@/app/api/calendar/route";
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
    const order = [
      "petiteOurse",
      "grandeOurse",
      "orion",
      "cassiopee",
      "andromede",
      "pegase",
    ];
    return rentals.sort(
      (a, b) => order.indexOf(a.type) - order.indexOf(b.type),
    );
  };

  const fetchReservedDates = async (
    rental_type:
      | "petiteOurse"
      | "grandeOurse"
      | "orion"
      | "cassiopee"
      | "andromede"
      | "pegase",
  ): Promise<ReservationInput[]> => {
    try {
      const fetchedDates = await getAllCalendar(rental_type);
      // Transforme les dates récupérées si nécessaire
      const transformedDates: ReservationInput[] = fetchedDates
        .filter((date) => typeof date.id === "string") // Filtre pour s'assurer que id est une chaîne valide
        .map((date) => ({
          id: date.id as string, // Conversion de id en type string
          rental_type: date.rental_type,
          start_date: date.start_date,
          end_date: date.end_date,
          type: date.type,
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

  const handleDeleteReservation = async (id: string) => {
    try {
      await deleteCalendar(id);
      toast.success("Réservation supprimée avec succès !");
    } catch (error) {
      console.error("Error deleting calendar event:", error);
      toast.error("Erreur lors de la suppression de la réservation !");
    }
  };

  return (
    <div className=" py-20 mt-6 lg:mt-0">
      <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-8 lg:my-8">
        <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
        <h1 className="text-text_color font-semibold text-center lg:text-lg uppercase ">
          Mise à jour des réservations
        </h1>
        <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-y-16  md:mx-10 justify-center lg:mt-16 ">
        {rentalsCalendar.map((rental) => (
          <div key={rental.id}>
            <AddReservation
              rentalType={rental.type}
              fetchReservedDates={fetchReservedDates}
              addCalendarEvent={handleAddCalendarEvent}
              deleteReservation={handleDeleteReservation}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRentalsCalendar;

