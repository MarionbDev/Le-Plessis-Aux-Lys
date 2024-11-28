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

  // Mappage entre types et noms personnalisés
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

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const nextMonth = currentMonth + 1;
          const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

          // Filter for ongoing reservations
          const ongoingReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            const endDate = new Date(reservation.end_date);
            return startDate <= now && endDate >= now;
          });

          // Filter for reservations in the current month
          const currentMonthReservations = reservedDates.filter(
            (reservation) => {
              const startDate = new Date(reservation.start_date);
              return (
                startDate.getFullYear() === currentYear &&
                startDate.getMonth() === currentMonth &&
                startDate > now
              );
            },
          );

          // Filter for reservations in the next month
          const nextMonthReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            return (
              startDate.getFullYear() === nextYear &&
              startDate.getMonth() === nextMonth &&
              startDate > now
            );
          });

          // Filter for future reservations
          const upcomingReservations = reservedDates.filter((reservation) => {
            const startDate = new Date(reservation.start_date);
            return startDate > now;
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
      "petite-ourse",
      "grande-ourse",
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
        .filter((date) => typeof date.id === "string")
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
    <div className=" text-text_color  flex flex-col py-10 w-full ">
      <div className=" mx-10 mb-6 mt-6">
        <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-10 lg:my-8">
          <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
          <h1 className=" font-semibold text-center lg:text-lg uppercase ">
            Suivi des réservations
          </h1>
          <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
        </div>
        {/* <h2 className=" text-lg ">Suivi des réservations :</h2> */}
      </div>

      <div className="flex flex-wrap justify-center xl:justify-start  xl:ml-10 gap-y-10 gap-x-20 text-[0.9rem]">
        {rentalsCalendar.map((rental) => (
          <div className="shadow-md rounded-md w-[22rem] " key={rental.id}>
            <Card className="mb-8 w-[22rem] h-full border-2 text-text_color   rounded-md">
              <CardHeader>
                <CardTitle className="text-[1rem] font-bold uppercase text-center mb-2 ">
                  {rentalNames[rental.type]}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col text-[0.9rem] gap-4 h-[18rem] overflow-auto  mostly-customized-scrollbar mx-1 ">
                <div>
                  <h3 className="font-semibold">Réservations en cours</h3>
                  <ul className="list-disc pl-5">
                    {reservationsByType[rental.type]?.ongoing.length ? (
                      reservationsByType[rental.type].ongoing.map(
                        (reservation) => (
                          <li key={reservation.id}>
                            {`Du ${new Date(reservation.start_date).toLocaleDateString()} au ${new Date(reservation.end_date).toLocaleDateString()}`}
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
                          <li key={reservation.id}>
                            {`Du ${new Date(reservation.start_date).toLocaleDateString()} au ${new Date(reservation.end_date).toLocaleDateString()}`}
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
                          <li key={reservation.id}>
                            {`Du ${new Date(reservation.start_date).toLocaleDateString()} au ${new Date(reservation.end_date).toLocaleDateString()}`}
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

