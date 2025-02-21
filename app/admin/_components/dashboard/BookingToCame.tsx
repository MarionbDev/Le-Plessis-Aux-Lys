"use client";

import { getAllCalendar } from "@/app/api/calendar/route";
import { getAllRentals } from "@/app/api/rentals/route";
import { RentalCalendar, ReservationInput } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

type Rental = {
  id: string;
  type:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
};

const BookingToCome: React.FC = () => {
  const [rentalsCalendar, setRentalsCalendar] = useState<RentalCalendar[]>([]);
  const [reservationsByType, setReservationsByType] = useState<{
    [key: string]: {
      ongoing: ReservationInput[];
      currentMonth: ReservationInput[];
      nextMonth: ReservationInput[];
      upcoming: ReservationInput[];
    };
  }>({});

  const rentalNames: Record<Rental["type"], string> = {
    petiteOurse: "Le Logis de la petite Ourse",
    grandeOurse: "Le Logis de la grande Ourse",
    orion: "Orion",
    cassiopee: "Cassiopée",
    andromede: "Andromède",
    pegase: "Suite familiale Pégase",
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsData = await getAllRentals();
        const sortedRentalsCalendar = sortRentalsCalendar(rentalsData);
        setRentalsCalendar(sortedRentalsCalendar);

        const reservationsMap: {
          [key: string]: {
            ongoing: ReservationInput[];
            currentMonth: ReservationInput[];
            nextMonth: ReservationInput[];
            upcoming: ReservationInput[];
          };
        } = {};

        for (const rental of sortedRentalsCalendar) {
          const reservedDates = await fetchReservedDates(rental.type);
          console.log("reservations", reservedDates);

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const nextMonth = (currentMonth + 1) % 12;
          const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

          const ongoingReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            const endDate = new Date(reservation.end_date);
            const now = new Date();

            // Réinitialise l'heure de "now", "startDate" et "endDate" à 00:00:00 pour éviter les problèmes liés aux heures.
            now.setHours(0, 0, 0, 0);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);

            // Vérifie si la date actuelle est dans la période de réservation
            return startDate <= now && endDate >= now;
          });

          // Réservations en-cours
          const upcomingReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            return startDate > now;
          });

          // Réservations pour le mois en-cours
          const currentMonthReservations = reservedDates.filter(
            (reservation) => {
              const startDate = new Date(reservation.start_date);
              const startMonth = startDate.getMonth();
              const startYear = startDate.getFullYear();
              return (
                startYear === currentYear &&
                startMonth === currentMonth &&
                startDate >= now
              );
            },
          );

          // Réservations pour le mois prochain
          const nextMonthReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            const startMonth = startDate.getMonth();
            const startYear = startDate.getFullYear();
            return (
              startYear === nextYear &&
              startMonth === nextMonth &&
              startDate >= now
            );
          });

          reservationsMap[rental.type] = {
            ongoing: ongoingReservations,
            currentMonth: currentMonthReservations,
            nextMonth: nextMonthReservations,
            upcoming: upcomingReservations,
          };
        }

        setReservationsByType(reservationsMap);
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
      return fetchedDates
        .filter(
          (date) => typeof date.id === "string" && date.type === "reserve",
        )
        .map((date) => ({
          id: date.id as string,
          rental_type: date.rental_type,
          start_date: date.start_date,
          end_date: date.end_date,
          type: date.type,
        }));
    } catch (error) {
      console.error(`Error fetching reserved dates for ${rental_type}:`, error);
      throw error;
    }
  };

  return (
    <div className="text-text_color flex flex-col py-10 w-full mt-8 lg:mt-4">
      <div className="mx-10 mb-6 mt-6">
        <div className="flex flex-col lg:flex-row items-center justify-center my-4 lg:mt-0 gap-4 lg:gap-8 lg:my-8">
          <span className="flex justify-center w-[16rem] border-t-2 border-separator"></span>
          <h1 className="font-semibold text-center lg:text-lg uppercase">
            Suivi des réservations
          </h1>
          <span className="flex justify-center w-[16rem] border-t-2 border-separator"></span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center xl:justify-start mt-8 lg:mt-0 mx-1 md:mx-2 xl:ml-36 2xl:ml-48 gap-y-10 gap-x-8 text-[0.9rem]">
        {rentalsCalendar.map((rental) => (
          <div className="shadow-md rounded-md w-[22rem]" key={rental.id}>
            <Card className="mb-8 w-[22rem] h-full border-2 text-text_color rounded-md">
              <CardHeader>
                <CardTitle className="text-[1rem] font-bold uppercase text-center mb-2">
                  {rentalNames[rental.type]}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col text-[0.9rem] gap-4 h-[18rem] overflow-auto mostly-customized-scrollbar mx-1">
                <div>
                  <h3 className="font-semibold">Réservations en cours</h3>
                  <ul className="list-disc pl-5">
                    {reservationsByType[rental.type]?.ongoing.length ? (
                      reservationsByType[rental.type].ongoing.map(
                        (reservation) => (
                          <li key={reservation.id} className="my-1">
                            {`Du ${new Date(
                              reservation.start_date,
                            ).toLocaleDateString(
                              "fr-FR",
                            )} au ${new Date(reservation.end_date).toLocaleDateString("fr-FR")}`}
                          </li>
                        ),
                      )
                    ) : (
                      <li>Aucune réservation en cours</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-semibold">
                    Réservations pour ce mois-ci
                  </h3>
                  <ul className="list-disc pl-5">
                    {reservationsByType[rental.type]?.currentMonth.length ? (
                      reservationsByType[rental.type].currentMonth.map(
                        (reservation) => (
                          <li key={reservation.id} className="my-1">
                            {`Du ${new Date(
                              reservation.start_date,
                            ).toLocaleDateString(
                              "fr-FR",
                            )} au ${new Date(reservation.end_date).toLocaleDateString("fr-FR")}`}
                          </li>
                        ),
                      )
                    ) : (
                      <li>Aucune réservation pour ce mois-ci</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-semibold">
                    Réservations pour le mois prochain
                  </h3>
                  <ul className="list-disc pl-5">
                    {reservationsByType[rental.type]?.nextMonth.length ? (
                      reservationsByType[rental.type].nextMonth.map(
                        (reservation) => (
                          <li key={reservation.id} className="my-1">
                            {`Du ${new Date(
                              reservation.start_date,
                            ).toLocaleDateString(
                              "fr-FR",
                            )} au ${new Date(reservation.end_date).toLocaleDateString("fr-FR")}`}
                          </li>
                        ),
                      )
                    ) : (
                      <li>Aucune réservation pour le mois prochain</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingToCome;

