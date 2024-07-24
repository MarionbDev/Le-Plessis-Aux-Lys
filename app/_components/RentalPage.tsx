"use client";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
import BookingCalendar from "../_components/calendar/BookingCalendar";
import EmblaCarousel from "../_components/carousel/EmblaCarousel";
import { getAllCalendar } from "../api/calendar/route";
import { CustomDateRange, RentalType } from "../types";

type PropType = {
  title: string;
  lowSeasonNightRate?: number;
  lowSeasonWeeklyRate?: number;
  highSeasonNightRate?: number;
  highSeasonWeeklyRate?: number;
  imagesSlide?: string[];
  rentalType: RentalType;
};

const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };

export default function RentalPage({
  title,
  lowSeasonNightRate,
  lowSeasonWeeklyRate,
  highSeasonNightRate,
  highSeasonWeeklyRate,
  imagesSlide,
  rentalType,
}: PropType) {
  const [reservedDates, setReservedDates] = useState<CustomDateRange[]>([]);

  useEffect(() => {
    async function fetchReservedDates() {
      try {
        const reservations = await getAllCalendar(rentalType);
        const reservedDates = reservations.map((reservation) => ({
          from: new Date(reservation.start_date),
          to: new Date(reservation.end_date),
          rentalType,
          type: reservation.type,
        }));
        // console.log("Dates réservés:", reservedDates);
        setReservedDates(reservedDates);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    }
    fetchReservedDates();
  }, [rentalType]);

  const displayRate = (rate?: number) =>
    rate !== undefined && rate !== null ? `${rate} €` : "-";

  return (
    <div className="font-text text-text_color pt-[2rem] xl:gap-16 xl:flex xl:justify-center">
      <div className="flex flex-col lg:flex-row justify-around items-center ml-10">
        <div className="flex flex-col items-center lg:mx-8 lg:px-10 py-4  mt-14 ">
          <h3 className="lg:text-lg mb-8  font-bold  ">{title}</h3>
          {(lowSeasonNightRate !== undefined ||
            lowSeasonWeeklyRate !== undefined ||
            highSeasonNightRate !== undefined ||
            highSeasonWeeklyRate !== undefined) && (
            <section className="flex justify-center gap-14   w-4/5 py-2 bg-[#b7ae47]/10 shadow-basic ">
              <div>
                <p className=" font-semibold">Tarifs</p>
                <p>La nuit </p>
                <p>La semaine</p>
              </div>
              <div className="flex gap-14">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Basse Saison</p>
                  <p>
                    <p>{displayRate(lowSeasonNightRate)}</p>
                    <p>{displayRate(lowSeasonWeeklyRate)}</p>
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Haute Saison</p>
                  <p>{displayRate(highSeasonNightRate)}</p>
                  <p>{displayRate(highSeasonWeeklyRate)}</p>
                </div>
              </div>
            </section>
          )}
          <section className="mt-10 p-4  shadow-div rounded-md border-2 border-yellow/50">
            <div className=" ">
              <BookingCalendar reservedDates={reservedDates} />
            </div>
            <div>
              <ul className="flex justify-end gap-10 italic text-[0.8rem]">
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-white border-2 rounded-full"></span>
                  <p>Disponible</p>
                </li>
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-[#db3636] border-2 rounded-full"></span>
                  <p>Réservé</p>
                </li>
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-white border-2 rounded-full relative flex items-center">
                    <div className="absolute h-px w-3 bg-[#a2a3a5] "></div>
                  </span>
                  <p>Indisponible</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
        {imagesSlide && imagesSlide.length > 0 ? (
          <section className="flex lg:w-[44rem] lg:pt-[4.5rem]">
            <EmblaCarousel slides={imagesSlide} options={OPTIONS} />
          </section>
        ) : (
          <div>Pas d'images disponibles</div>
        )}
      </div>
    </div>
  );
}

