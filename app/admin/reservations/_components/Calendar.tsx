"use client";

import { addCalendar, getAllCalendar } from "@/app/api/calendar/route";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Reservation = {
  id: string;
  rental_id: string;
  start_date: string;
  end_date: string;
};

export default function CalendarRentalsCardAdmin() {
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: undefined,
    to: undefined,
  });
  const [reservedDates, setReservedDates] = React.useState<Reservation[]>([]);

  console.log("selectedDates:", selectedDates);
  console.log("reservedDates:", reservedDates);

  // Récupérer les dates aux chargements depuis Supabase
  const fetchCalendar = async () => {
    try {
      const fetchedCalendar = await getAllCalendar();
      setReservedDates(fetchedCalendar);
    } catch (error) {
      console.error("Error fetching calendar", error);
    }
  };

  React.useEffect(() => {
    fetchCalendar();
  }, []);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedDates(range);
  };

  const handleSubmit = async () => {
    if (!selectedDates?.from || !selectedDates?.to) {
      console.error("Veuillez sélectionner une plage de dates complète");
      return;
    }

    try {
      // Cloner les dates sélectionnées pour éviter de modifier l'état directement
      const startDate = new Date(selectedDates.from);
      const endDate = new Date(selectedDates.to);

      // // Ajouter 1 jour à la date de fin pour inclure cette journée dans la plage
      endDate.setDate(endDate.getDate() + 1);
      // // Ajouter 1 jour à la date de début pour inclure cette journée dans la plage
      startDate.setDate(startDate.getDate() + 1);

      // Convertir les dates en format ISO sans l'heure
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      // Envoyer les dates au serveur
      await addCalendar({
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });

      // Rafraîchir les dates depuis Supabase
      await fetchCalendar();
      setSelectedDates({ from: undefined, to: undefined });
    } catch (error: any) {
      console.error("Error submitting dates:", error.message);
    }
  };

  const isDateReserved = (date: Date) => {
    return reservedDates.some((reservation) => {
      const startDate = new Date(reservation.start_date);
      const endDate = new Date(reservation.end_date);

      // Vérifier si la date est entre la date de début et de fin de la réservation
      return date >= startDate && date < endDate;
    });
  };

  // Modificateur pour marquer les jours du range sélectionné
  const modifiers = {
    selectedRange: {
      from: selectedDates?.from,
      to: selectedDates?.to,
    },
    reserved: (date: Date) => isDateReserved(date),
  };

  // Styles CSS pour les jours du range sélectionné
  const modifiersStyles = {
    selected: {
      backgroundColor: "#1976D2",
      color: "white",
      borderRadius: "0px",
    },
    disabled: {
      backgroundColor: "#F5F5F5",
      color: "#BDBDBD",
    },
  };

  const handleResetClick = () => setSelectedDates(undefined);

  let footer = <>Veuillez sélectionner une ou plusieurs dates.</>;

  if (selectedDates && selectedDates.from && selectedDates.to) {
    const numberOfDays =
      selectedDates.to.getDate() - selectedDates.from.getDate() + 1;
    footer = (
      <>
        Vous avez sélectionné {numberOfDays} jours.{" "}
        <button onClick={handleResetClick}>Réinitialiser</button>
      </>
    );
  }

  return (
    <div>
      <DayPicker
        mode="range"
        locale={fr}
        selected={selectedDates}
        onSelect={handleSelect}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={reservedDates.flatMap((reservation) => [
          {
            from: new Date(reservation.start_date),
            to: new Date(reservation.end_date),
          },
        ])}
        footer={footer}
      />
      <div>
        <button onClick={handleSubmit} className="bg-slate-300">
          Submit
        </button>
      </div>
      <div>
        <p>Récap des dates réservées :</p>
        <ul>
          {reservedDates.map((date) => (
            <li key={date.id}>
              <p>
                Du{" "}
                {format(new Date(date.start_date), "dd MMMM yyyy", {
                  locale: fr,
                })}{" "}
                au{" "}
                {format(new Date(date.end_date), "dd MMMM yyyy", {
                  locale: fr,
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

