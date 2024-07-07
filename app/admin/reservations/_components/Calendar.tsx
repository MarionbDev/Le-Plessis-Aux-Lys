import { CalendarEvent, ReservationInput } from "@/app/types";
import { fr } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";

type AddReservationProps = {
  rentalType: "gite" | "chambre 1" | "chambre 2" | "chambre 3"; // Utilisation de l'ENUM rental_type
  fetchReservedDates: (
    rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3",
  ) => Promise<ReservationInput[]>;
  addCalendarEvent: (event: CalendarEvent) => Promise<void>;
};

const AddReservation: React.FC<AddReservationProps> = ({
  rentalType,
  fetchReservedDates,
  addCalendarEvent,
}) => {
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [reservedDates, setReservedDates] = useState<ReservationInput[]>([]);

  useEffect(() => {
    const fetchReservedDatesForRentalType = async () => {
      try {
        const fetchedDates = await fetchReservedDates(rentalType);
        console.log(`fatche calendar ${rentalType} : `, fetchedDates);
        setReservedDates(fetchedDates);
      } catch (error) {
        console.error(
          `Error fetching reserved dates for ${rentalType}:`,
          error,
        );
      }
    };

    fetchReservedDatesForRentalType();
  }, [rentalType, fetchReservedDates]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedDates(range);
  };

  const handleSubmit = async () => {
    if (!selectedDates?.from || !selectedDates?.to) {
      console.error("Veuillez sélectionner une plage de dates");
      return;
    }

    try {
      const startDate = new Date(selectedDates.from);
      const endDate = new Date(selectedDates.to);
      endDate.setDate(endDate.getDate() + 1);
      startDate.setDate(startDate.getDate() + 1);

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      await addCalendarEvent({
        id: "",
        rental_type: rentalType,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });

      toast.success("Réservation ajoutée avec succès !");
      setSelectedDates({ from: undefined, to: undefined });
    } catch (error: any) {
      console.error("Error submitting dates:", error.message);
      toast.error("Erreur lors de l'ajout de la réservation !");
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
    <div className="flex flex-col items-center">
      <DayPicker
        mode="range"
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
        locale={fr}
      />
      <button onClick={handleSubmit}>Ajouter Réservation</button>
    </div>
  );
};

export default AddReservation;

