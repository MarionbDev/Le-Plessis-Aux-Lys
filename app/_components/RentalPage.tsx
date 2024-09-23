"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BookingCalendar from "../_components/calendar/BookingCalendar";
import { getAllCalendar } from "../api/calendar/route";
import { CustomDateRange, RentalType } from "../types";

type PropType = {
  title: string;
  subTitle: string;
  description: string;
  lowSeasonNightRate?: number;
  lowSeasonWeeklyRate?: number;
  highSeasonNightRate?: number;
  highSeasonWeeklyRate?: number;
  imagesSlide?: string[];
  rentalType: RentalType;
};

// const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };

export default function RentalPage({
  title,
  subTitle,
  description,
  lowSeasonNightRate,
  lowSeasonWeeklyRate,
  highSeasonNightRate,
  highSeasonWeeklyRate,
  imagesSlide = [],
  rentalType,
}: PropType) {
  const [reservedDates, setReservedDates] = useState<CustomDateRange[]>([]);
  const [mainImage, setMainImage] = useState<string>(imagesSlide[0] || "");

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

  // Effet pour mettre à jour mainImage lorsque imagesSlide change
  useEffect(() => {
    if (imagesSlide.length > 0) {
      setMainImage(imagesSlide[0]); // Définit la première image comme image principale
    }
  }, [imagesSlide]);

  const displayRate = (rate?: number) =>
    rate !== undefined && rate !== null ? `${rate} €` : "-";

  return (
    <div className="font-text text-text_color  pt-[2rem]  mt-14 flex justify-around mx-14  ">
      <div className="">
        <div className="flex gap-20 py-4 mt-14 ">
          <div className="flex  justify-between w-full  ">
            <div>
              <div>
                <h3 className="lg:text-xl mb-2  font-bold  ">{title}</h3>
                <h3 className="lg:text-md mb-8 h-4  font-bold ">{subTitle}</h3>
              </div>
              <div className="flex  flex-col gap-16">
                <section className="p-4  shadow-div rounded-md border-2 border-yellow/50 ">
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
                <section className="flex justify-center">
                  {(lowSeasonNightRate !== undefined ||
                    lowSeasonWeeklyRate !== undefined ||
                    highSeasonNightRate !== undefined ||
                    highSeasonWeeklyRate !== undefined) && (
                    <section className="flex justify-center gap-20 w-full py-2 shadow-div rounded-md border-2 border-yellow/50 ">
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
                </section>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center  ">
            {imagesSlide && imagesSlide.length > 0 ? (
              <section className="flex flex-col justify-center items-center lg:w-[44rem] mt-6 ">
                {/* <EmblaCarousel slides={imagesSlide} options={OPTIONS} /> */}
                {/* Image principale */}
                <div className="flex justify-center lg:w-[40rem] lg:h-auto mb-2 ">
                  <img
                    src={mainImage}
                    alt="Image principale"
                    className="object-scale-down h-[20rem] lg:h-[30rem] w-auto"
                  />
                </div>

                {/* Vignettes */}

                <div className="flex flex-wrap justify-start w-full ml-12 gap-2">
                  {imagesSlide.map((image, index) => (
                    <div
                      key={index}
                      className={`w-24 h-24 border-2 cursor-pointer rounded-lg overflow-hidden ${
                        mainImage === image ? "border-yellow-500" : ""
                      }`}
                      onClick={() => setMainImage(image)}
                    >
                      <Image
                        width={400}
                        height={200}
                        src={image}
                        alt={`Vignette ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className="flex  justify-center items-center lg:w-[44rem] lg:h-[30rem] ">
                <p>Pas d'images disponibles</p>
              </div>
            )}
          </div>
        </div>
        <div className=" w-full  mt-10">
          <div className="  mx-10 ">
            <p className="lg:text-md mb-8  font-medium ">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

