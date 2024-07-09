import { CalendarEvent, ReservationInput } from "@/app/types";
import { Button } from "@/components/ui/button";
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
  console.log("AddReservation component re-rendered");
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
        setFilteredDates(fetchedDates);
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
    // console.log("Selected dates:", range);
  };

  const handleSubmit = async () => {
    if (!selectedDates?.from || !selectedDates?.to) {
      toast.warning("Veuillez sélectionner une ou plusieurs dates");
      return;
    }

    if (!reservationType) {
      toast.warning("Veuillez sélectionner un type de réservation");
      return;
    }

    try {
      const startDate = new Date(selectedDates.from);
      const endDate = new Date(selectedDates.to);
      endDate.setDate(endDate.getDate() + 1);
      startDate.setDate(startDate.getDate() + 1);

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      // console.log(
      //   `Submitting dates: ${formattedStartDate} to ${formattedEndDate}`,
      // );

      await addCalendarEvent({
        rental_type: rentalType,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        type: reservationType,
      });

      console.log("Setting state after successful submission");

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
    <div className="font-text md:gap-10 shadow-div rounded-md border-2 border-yellow/50 py-4 mx-6 ">
      <p className="font-semibold text-center text-[1.2rem] mb-2">
        {rentalType.charAt(0).toUpperCase() + rentalType.slice(1)}{" "}
      </p>
      <div className="flex flex-col md:flex-row md:justify-around">
        <div className="flex flex-col items-center">
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

          <div className="flex flex-col">
            <div className="flex gap-4 mb-2 ">
              <Button
                className={`px-4 py-2 ${
                  reservationType === "reserve"
                    ? "bg-[#dd5757] text-white shadow-div font-text rounded-md text-sm"
                    : "bg-gray-200 rounded-md font-text text-sm"
                }`}
                onClick={() => setReservationType("reserve")}
              >
                Réservé
              </Button>
              <Button
                className={`px-4 py-2 ${
                  reservationType === "indisponible"
                    ? "bg-gray-400 text-white shadow-div font-text rounded-md text-sm"
                    : "bg-gray-200 rounded-md font-text text-sm"
                }`}
                onClick={() => {
                  console.log("Button Réservé clicked");
                  setReservationType("indisponible");
                }}
              >
                Indisponible
              </Button>
            </div>
            <div className=" h-[1.8rem] ">
              <p
                className={`text-[0.85rem]  ${reservationType !== undefined ? "hidden" : "italic"}`}
              >
                Veuillez sélectionner un statut
              </p>
            </div>
          </div>
          <div className="md:pb-2">
            <Button
              onClick={handleSubmit}
              className="font-text text-base w-[12rem] hover:text-white hover:bg-gold/80 bg-gold/30 mt-4 py-2 px-2  rounded-md"
            >
              Ajouter Réservation
            </Button>
          </div>
        </div>

        <div className="flex flex-col min-w-72 items-center h-[12rem] md:h-[35rem]  md:mt-5">
          <p className="md:mb-6 invisible md:visible ">Réservations</p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par date"
            className="mb-4 p-2 border border-gray-300 rounded italic text-sm w-48"
          />
          {filteredDates.length > 0 && searchTerm && (
            <ul className=" overflow-auto h-[12rem]  md:h-[25rem]   ">
              {filteredDates.map((reservation) => (
                <li key={reservation.id} className="mb-2 text-sm flex">
                  <p>
                    Du {new Date(reservation.start_date).toLocaleDateString()}{" "}
                    au {new Date(reservation.end_date).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {filteredDates.length === 0 && searchTerm && (
            <p className="italic text-sm w-48">
              Aucune réservation trouvée pour cette recherche.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReservation;

