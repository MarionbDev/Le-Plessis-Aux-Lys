"use client";
import { Loader } from "lucide-react";
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
  const [mainImage, setMainImage] = useState<string>(imagesSlide[0]);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div className="font-text text-text_color  md:pt-[2rem] flex md:justify-around md:mx-14 ">
      <div className="flex flex-col  md:flex-row gap-20 md:py-4 md:mt-14">
        <div className="flex flex-col justify-between md:w-full  ">
          <div className="flex flex-col justify-center ">
            <div className="flex justify-center text-center">
              <div className="flex flex-col md:w-full lg:flex-row items-center justify-center mt-16 mb-10 md:mb-0 lg:mt-0 gap-4 lg:gap-12 lg:my-20">
                <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
                <p className=" font-semibold text-center lg:text-xl uppercase lg:w-[27rem]  ">
                  {title}
                </p>
                <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
                <h3 className="lg:text-md mb-8 h-4  font-bold ">{subTitle}</h3>
              </div>{" "}
            </div>
            <div className=" flex flex-col-reverse md:flex-row gap-16 md:gap-6">
              <div className=" ">
                <div className="flex flex-col-reverse md:flex-col items-center gap-12 md:gap-20">
                  <section className="p-4  w-[22rem] md:w-full shadow-div rounded-md border-2 border-yellow/50 ">
                    <div className=" pb-4 md:pb-0">
                      <BookingCalendar reservedDates={reservedDates} />
                    </div>
                    <div>
                      <ul className="flex flex-col md:flex-row justify-end gap-2 md:gap-10 italic text-[0.8rem]">
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

                  {/* Section tarifs mobile*/}
                  <section className="prices-section-mobile flex justify-center w-4/5 shadow-div rounded-md border-2 border-yellow/50 py-4 ">
                    <div className="flex flex-col-reverse gap-12">
                      <div className=" text-center">
                        <p className="font-semibold">Tarifs Haute Saison</p>
                        <div className="flex gap-20 mt-4">
                          <div>
                            <p>La nuit </p>
                            <p>{displayRate(highSeasonNightRate)}</p>
                          </div>
                          <div>
                            {" "}
                            <div>
                              <p>La Semaine </p>
                              <p>{displayRate(highSeasonWeeklyRate)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" text-center">
                        <p className="font-semibold">Tarifs Basse Saison</p>
                        <div className="flex gap-20 mt-4">
                          <div>
                            <p>La nuit </p>
                            <p>{displayRate(lowSeasonNightRate)}</p>
                          </div>
                          <div>
                            {" "}
                            <div>
                              <p>La Semaine </p>
                              <p>{displayRate(lowSeasonWeeklyRate)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section tarifs desktop*/}
                  <section className="prices-section flex justify-center w-4/5 md:w-full  ">
                    {(lowSeasonNightRate !== undefined ||
                      lowSeasonWeeklyRate !== undefined ||
                      highSeasonNightRate !== undefined ||
                      highSeasonWeeklyRate !== undefined) && (
                      <section className="flex justify-center md:gap-20 w-full  shadow-div rounded-md border-2 border-yellow/50 px-4 py-2  ">
                        <div className="">
                          <p className="font-semibold">Tarifs</p>
                          <p>La nuit </p>
                          <p>La semaine</p>
                        </div>
                        <div className="flex gap-8  md:gap-14">
                          <div className="flex flex-col items-center justify-center ">
                            <p className="font-semibold text-center">
                              Basse Saison
                            </p>
                            <p>
                              <p>{displayRate(lowSeasonNightRate)}</p>
                              <p>{displayRate(lowSeasonWeeklyRate)}</p>
                            </p>
                          </div>
                          <div className="flex flex-col items-center ">
                            <p className="font-semibold text-center">
                              Haute Saison
                            </p>
                            <p>{displayRate(highSeasonNightRate)}</p>
                            <p>{displayRate(highSeasonWeeklyRate)}</p>
                          </div>
                        </div>
                      </section>
                    )}
                  </section>
                </div>
              </div>
              {imagesSlide && imagesSlide.length > 0 ? (
                <section className="flex flex-col justify-center items-center  lg:w-[44rem] -mt-14 ">
                  <div className="flex justify-center  lg:w-[40rem] lg:h-auto mb-2">
                    {loading && (
                      <div className="flex justify-center items-center h-[30rem]">
                        <Loader size={50} className="animate-spin" />
                      </div>
                    )}
                    <img
                      src={mainImage}
                      alt="Image principale"
                      className="object-scale-down h-[20rem] lg:h-[30rem] w-auto"
                      onLoad={() => setLoading(false)} // Mettre à jour l'état de chargement
                      style={{ display: loading ? "none" : "block" }} // Masquer l'image jusqu'à son chargement
                    />
                  </div>

                  {/* Vignettes */}
                  <div className="flex flex-wrap px-6 md:justify-start w-[25rem] md:w-full md:ml-12 gap-2 overflow-x-auto ">
                    {imagesSlide.map((image, index) => (
                      <div
                        key={index}
                        className={`w-28 h-28 md:w-24 md:h-24 border-2 cursor-pointer rounded-lg overflow-hidden  ${
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
                <div className="flex  justify-center items-center w-[25rem] lg:w-[44rem] lg:h-[30rem] ">
                  <p>Pas d'images disponibles</p>
                </div>
              )}
            </div>
          </div>
          <div className=" w-full  mt-10">
            <div className="  px-10 ">
              <p className="lg:text-md mb-8  font-medium ">{description}</p>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

