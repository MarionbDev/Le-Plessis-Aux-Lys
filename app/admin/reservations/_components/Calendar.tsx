import { CalendarEvent, ReservationInput } from "@/app/types";
import { Button } from "@/components/ui/button";
import { fr } from "date-fns/locale";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";
import ReservationList from "./ReservationList";

type AddReservationProps = {
  rentalType:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
  fetchReservedDates: (
    rental_type:
      | "petiteOurse"
      | "grandeOurse"
      | "orion"
      | "cassiopee"
      | "andromede"
      | "pegase",
  ) => Promise<ReservationInput[]>;
  addCalendarEvent: (event: CalendarEvent) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
};

// Mappage des types de location aux noms conviviaux
const rentalNames: Record<
  | "petiteOurse"
  | "grandeOurse"
  | "orion"
  | "cassiopee"
  | "andromede"
  | "pegase",
  string
> = {
  petiteOurse: "Le Logis de la petite Ourse",
  grandeOurse: "Le Logis de la grande Ourse",
  orion: "Orion",
  cassiopee: "Cassiopée",
  andromede: "Andromède",
  pegase: "Suite familiale Pégase",
};

const AddReservation: React.FC<AddReservationProps> = ({
  rentalType,
  fetchReservedDates,
  addCalendarEvent,
  deleteReservation,
}) => {
  // console.log("AddReservation component re-rendered");
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
    // console.log("Effect triggered for fetchReservedDates");
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

  const handleSelect = useCallback((range: DateRange | undefined) => {
    // console.log("handleSelect function created");

    setSelectedDates(range);
    // console.log("Selected dates:", range);
  }, []);

  const handleSubmit = useCallback(async () => {
    // console.log("handleSubmit function created");

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

      await addCalendarEvent({
        rental_type: rentalType,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        type: reservationType,
      });

      // console.log("Setting state after successful submission");

      setSelectedDates({ from: undefined, to: undefined });
      setReservationType(undefined);
      const updatedReservedDates = await fetchReservedDates(rentalType);
      setReservedDates(updatedReservedDates);
    } catch (error: any) {
      console.error("Error submitting dates:", error.message);
      toast.error("Erreur lors de l'ajout de la réservation !");
    }
  }, [
    selectedDates,
    reservationType,
    rentalType,
    addCalendarEvent,
    fetchReservedDates,
  ]);

  const handleDelete = useCallback(
    async (id: string) => {
      // console.log("handleDelete function created");
      try {
        await deleteReservation(id);
        setReservedDates(
          reservedDates.filter((reservation) => reservation.id !== id),
        );
      } catch (error: any) {
        // console.error("Error deleting reservation:", error.message);
        toast.error("Erreur lors de la suppression de la réservation !");
      }
    },
    [reservedDates, deleteReservation],
  );

  useEffect(() => {
    // console.log("Effect triggered for filteredReservations");
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

  const modifiers = useMemo(
    () => ({
      selectedRange: {
        from: selectedDates?.from,
        to: selectedDates?.to,
      },
      reserved: reservedDates
        .filter((date) => date.type === "reserve")
        .map(({ start_date, end_date }) => ({
          from: new Date(start_date),
          to: new Date(end_date),
        })),
      unavailable: reservedDates
        .filter((date) => date.type === "indisponible")
        .map(({ start_date, end_date }) => ({
          from: new Date(start_date),
          to: new Date(end_date),
        })),
    }),
    [selectedDates, reservedDates],
  );

  // console.log("Modifiers updated:", modifiers);

  const modifiersStyles = useMemo(
    () => ({
      selected: {
        backgroundColor: "#1976D2",
        color: "white",
        borderRadius: "50px",
      },
      reserved: {
        backgroundColor: "#db3636",
        color: "#ffffff",
      },
      unavailable: {
        color: "#c3c5c9",
        textDecoration: "line-through",
        textDecorationColor: "#a2a3a5",
      },
    }),
    [],
  );

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
        {rentalNames[rentalType].charAt(0).toUpperCase() +
          rentalNames[rentalType].slice(1)}{" "}
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
                    ? "bg-[#db3636] text-white shadow-div font-text rounded-md text-sm"
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
                <div className="absolute h-px w-24 bg-[#424346] "></div>

                <p>Indisponible</p>
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
        <ReservationList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredDates={filteredDates}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddReservation;

