import { CalendarEvent, ReservationInput } from "@/app/types";
import { fr } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";

type AddReservationProps = {
  rentalType: "gite" | "chambre 1" | "chambre 2" | "chambre 3";
  fetchReservedDates: (
    rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3",
  ) => Promise<ReservationInput[]>;
  addCalendarEvent: (event: CalendarEvent) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
};

const AddReservation: React.FC<AddReservationProps> = ({
  rentalType,
  fetchReservedDates,
  addCalendarEvent,
  deleteReservation,
}) => {
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [reservedDates, setReservedDates] = useState<ReservationInput[]>([]);
  const [reservationType, setReservationType] = useState<
    "indisponible" | "reserve" | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDates, setFilteredDates] = useState<ReservationInput[]>([]);

  useEffect(() => {
    const fetchReservedDatesForRentalType = async () => {
      try {
        const fetchedDates = await fetchReservedDates(rentalType);
        setReservedDates(fetchedDates);
        setFilteredDates(fetchedDates); // Initialisation avec toutes les réservations
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
    console.log("Selected dates:", range);
  };

  const handleSubmit = async () => {
    if (!selectedDates?.from || !selectedDates?.to) {
      console.error("Veuillez sélectionner une plage de dates");
      return;
    }

    if (!reservationType) {
      console.error("Veuillez sélectionner un type de réservation");
      return;
    }

    try {
      const startDate = new Date(selectedDates.from);
      const endDate = new Date(selectedDates.to);
      endDate.setDate(endDate.getDate() + 1);
      startDate.setDate(startDate.getDate() + 1);

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      console.log(
        `Submitting dates: ${formattedStartDate} to ${formattedEndDate}`,
      );

      await addCalendarEvent({
        rental_type: rentalType,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        type: reservationType,
      });

      toast.success("Réservation ajoutée avec succès !");
      setSelectedDates({ from: undefined, to: undefined });
      setReservationType(undefined);
      const updatedReservedDates = await fetchReservedDates(rentalType);
      setReservedDates(updatedReservedDates);
    } catch (error: any) {
      console.error("Error submitting dates:", error.message);
      toast.error("Erreur lors de l'ajout de la réservation !");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReservation(id);
      setReservedDates(
        reservedDates.filter((reservation) => reservation.id !== id),
      );
      toast.success("Réservation supprimée avec succès !");
    } catch (error: any) {
      console.error("Error deleting reservation:", error.message);
      toast.error("Erreur lors de la suppression de la réservation !");
    }
  };

  const isDateReserved = (day: Date, type: "indisponible" | "reserve") => {
    const dayTimestamp = day.getTime();

    const isReserved = reservedDates.some((reservation) => {
      const startDate = new Date(reservation.start_date).getTime();
      const endDate = new Date(reservation.end_date).getTime();

      const isInRange = dayTimestamp >= startDate && dayTimestamp <= endDate;

      return isInRange && reservation.type === type;
    });

    return isReserved;
  };

  useEffect(() => {
    // Filtrer les réservations en fonction de searchTerm
    const filteredReservations = reservedDates.filter(
      (reservation) =>
        reservation.start_date
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reservation.end_date.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredDates(filteredReservations);
  }, [searchTerm, reservedDates]);

  const modifiers = {
    selectedRange: {
      from: selectedDates?.from,
      to: selectedDates?.to,
    },
    reserved: (day: Date) => isDateReserved(day, "reserve"),
    unavailable: (day: Date) => isDateReserved(day, "indisponible"),
  };

  const modifiersStyles = {
    selected: {
      backgroundColor: "#1976D2",
      color: "white",
      borderRadius: "50px",
    },
    reserved: {
      backgroundColor: "#b72121",
      color: "#ffffff",
    },
    unavailable: {
      backgroundColor: "#e5e7eb",
      color: "#686666",
    },
  };

  let footer = (
    <p className="text-[0.85rem] italic ">
      Veuillez sélectionner une ou plusieurs dates.
    </p>
  );

  if (selectedDates && selectedDates.from && selectedDates.to) {
    const fromDate = new Date(selectedDates.from);
    const toDate = new Date(selectedDates.to);

    const timeDifference =
      toDate.getTime() - fromDate.getTime() + 1000 * 3600 * 24;
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    footer = (
      <div>
        <p className="text-[0.9rem]">
          Vous avez sélectionné du {fromDate.toLocaleDateString()} au{" "}
          {toDate.toLocaleDateString()}, soit {numberOfDays} jour(s)
        </p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="font-text flex justify-around gap-10 w-[45rem] shadow-div rounded-md border-2 border-yellow/50 p-4 ">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[1.1rem] mb-2">
          {rentalType.charAt(0).toUpperCase() + rentalType.slice(1)}{" "}
        </p>
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
          captionLayout="dropdown"
          fromYear={2024}
          toYear={currentYear + 3}
          className=""
        />

        <div className="flex gap-4 mt-4">
          <button
            className={`px-4 py-2 ${
              reservationType === "reserve"
                ? "bg-[#dd5757] text-white shadow-div font-text rounded-md text-sm"
                : "bg-gray-200 rounded-md font-text text-sm"
            }`}
            onClick={() => setReservationType("reserve")}
          >
            Réservé
          </button>
          <button
            className={`px-4 py-2 ${
              reservationType === "indisponible"
                ? "bg-gray-400 text-white shadow-div font-text rounded-md text-sm"
                : "bg-gray-200 rounded-md font-text text-sm"
            }`}
            onClick={() => setReservationType("indisponible")}
          >
            Indisponible
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="font-text hover:text-white hover:bg-gold/80 bg-gold/30 mt-4 py-2 px-4 rounded-md"
          >
            Ajouter Réservation
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        <p className="mb-6">Les réservations</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par date"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {filteredDates.length > 0 && searchTerm && (
          <ol className="">
            {filteredDates.map((reservation) => (
              <li key={reservation.id} className="mb-2 text-sm flex">
                <p>
                  Du {new Date(reservation.start_date).toLocaleDateString()} au{" "}
                  {new Date(reservation.end_date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ol>
        )}
        {filteredDates.length === 0 && searchTerm && (
          <p>Aucune réservation trouvée pour cette recherche.</p>
        )}
      </div>
    </div>
  );
};

export default AddReservation;

