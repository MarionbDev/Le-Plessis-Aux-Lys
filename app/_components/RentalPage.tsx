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
  const [mainImage, setMainImage] = useState<string>(imagesSlide[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState(false);

  console.log("rental page");

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

  useEffect(() => {
    console.time("RentalPage Render Time");
    return () => {
      console.timeEnd("RentalPage Render Time");
    };
  }, []);

  return (
    <div className="font-text text-text_color mt-10 md:pt-[2rem] flex justify-center md:justify-around  min-h-screen ">
      <div className="flex flex-col  md:flex-row gap-20 md:py-4 md:mt-14">
        <div className="flex flex-col justify-between xl:w-full  ">
          <div className="flex flex-col justify-center ">
            <div className="flex justify-center text-center">
              <div className="flex flex-col lg:mb-10">
                <div className="flex flex-col xl:w-full lg:flex-row items-center justify-center  mt-16  md:mb-0 sm:mt-0 gap-4 xl:gap-12 lg:my-8">
                  <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>

                  <h2 className=" font-prata font-semibold text-center lg:text-2xl uppercase lg:w-[27rem]  ">
                    {title}
                  </h2>
                  <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
                </div>
                <h3 className="lg:text-md mb-8 h-4 mt-4 lg:mt-2  mx-10  font-bold ">
                  {subTitle}
                </h3>
              </div>{" "}
            </div>
            <div className="flex flex-col md:mt-10 lg:mt-0 ">
              {mainImage && imagesSlide?.length > 0 ? (
                <section className="flex flex-col lg:flex-row lg:gap-8 sm:px-8 xl:mx-0  md:min-h-[24rem]  ">
                  <div className="flex justify-center items-center w-full   mb-2 md:-mt-3 min-h-[14rem]  ">
                    <img
                      src={mainImage}
                      alt={`Photo de  ${title}`}
                      className="object-scale-down  max-h-[14rem] md:max-h-[22rem]  md:w-[40rem]  rounded-md"
                      onLoad={() => setLoading(false)} // Mettre à jour l'état de chargement
                      style={{ display: loading ? "none" : "block" }} // Masquer l'image jusqu'à son chargement
                    />
                  </div>

                  {/* Vignettes */}
                  <div className=" flex flex-wrap justify-center gap-2 lg:justify-start lg:h-0 mx-4 max-w-[25rem] md:max-w-[35rem] lg:max-w-[30rem]">
                    {imagesSlide.map((image, index) => (
                      <div
                        key={index}
                        className={`w-28 h-28 md:w-24 md:h-24 border-2 cursor-pointer rounded-lg overflow-hidden  ${
                          mainImage === image
                            ? " border-4 border-[#bbbb57]"
                            : ""
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
                <p className=" text-center text-[0.9rem] italic text-gray-500">
                  Aucune photo disponible
                </p>
              )}

              <section className=" flex justify-center  ">
                <div className="max-w-[60rem] px-4 sm:mx-8 md:mx-14 mt-12">
                  <p className=" text-[0.9rem] px-6 font-medium ">
                    {description}
                  </p>
                </div>
              </section>

              <div className=" flex flex-col  gap-16 my-32 ">
                <div className="flex flex-col-reverse xl:flex-row md:gap-18 items-center gap-20 xl:gap-32  ">
                  <section className=" md:p-2  w-[22rem] md:w-[40rem]  shadow-div rounded-md ">
                    <div className="min-h-[21rem] px-5 ">
                      <BookingCalendar reservedDates={reservedDates} />
                    </div>
                    <div>
                      <ul className="flex flex-col md:flex-row justify-start  gap-4 italic pl-4 pb-4 text-[0.8rem]">
                        <li className="flex gap-2 items-center ">
                          <span className=" w-4 h-4 bg-white border-2 rounded-full"></span>
                          <p>Disponible</p>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className=" w-4 h-4 bg-[#db3636] border-2 rounded-full"></span>
                          <p>Réservé</p>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className=" w-4 h-4 bg-white border-2 rounded-full relative flex items-center">
                            <div className="absolute h-px w-3 bg-[#a2a3a5] opacity-50 "></div>
                          </span>
                          <p>Indisponible</p>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Section tarifs*/}
                  <section className=" flex flex-col items-center justify-center w-4/5 xl:border-l-2  xl:min-w-[30rem] max-w-[40rem]  lg:py-10   xl:mt-0">
                    <div className="flex flex-col gap-10  items-center">
                      <div>
                        <h2 className=" font-prata font-semibold text-center lg:text-2xl uppercase lg:w-[27rem]   ">
                          Les Tarifs
                          <span className="flex justify-center w-[8rem] mx-auto border-t-2  border-separator"></span>
                        </h2>
                      </div>
                      <div className=" text-center">
                        <p className="font-semibold ">Haute Saison</p>
                        <p className="italic text-center text-sm  px-5">
                          Haute saison : de Juin à Août
                        </p>

                        <div className="flex justify-center gap-20 mt-4 text-[0.9rem]">
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
                        <p className="font-semibold">Basse Saison</p>
                        <p className=" mt-2 italic text-center text-sm  px-5">
                          Basse saison : de Septembre à Mai
                        </p>
                        <div className="flex gap-20 justify-center mt-4 text-[0.9rem]">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

