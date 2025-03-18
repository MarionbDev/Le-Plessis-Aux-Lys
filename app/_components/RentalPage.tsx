"use client";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import BookingCalendar from "../_components/calendar/BookingCalendar";
import { getAllCalendar } from "../api/calendar/route";
import { CustomDateRange, RentalType } from "../types";

type PropType = {
  title: string;
  capacity: string;
  description: string;
  lowSeasonNightRate?: number;
  lowSeasonWeeklyRate?: number;
  highSeasonNightRate?: number;
  highSeasonWeeklyRate?: number;
  imagesSlide?: string[];
  rentalType: RentalType;
};

export default function RentalPage({
  title,
  capacity,
  description,
  lowSeasonNightRate,
  lowSeasonWeeklyRate,
  highSeasonNightRate,
  highSeasonWeeklyRate,
  imagesSlide = [],
  rentalType,
}: PropType) {
  const [reservedDates, setReservedDates] = useState<CustomDateRange[]>([]);
  const [mainImage, setMainImage] = useState(imagesSlide[0] ?? "");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReservedDates = useCallback(async () => {
    try {
      const reservations = await getAllCalendar(rentalType);
      const reservedDates = reservations.map((reservation) => ({
        from: new Date(reservation.start_date),
        to: new Date(reservation.end_date),
        rentalType,
        type: reservation.type,
      }));
      setReservedDates(reservedDates);
    } catch (error) {
      console.error("Error fetching reserved dates:", error);
    }
  }, [rentalType]);

  useEffect(() => {
    fetchReservedDates();
  }, [fetchReservedDates]);

  useEffect(() => {
    setMainImage(imagesSlide[0] || "");
  }, [imagesSlide]);

  const displayRate = (rate?: number) =>
    rate !== undefined && rate !== null ? `${rate} €` : "-";

  // Vérifiez si l'image ou la description sont présents
  const hasImage = mainImage && imagesSlide.length > 0;
  const isValidDescription = (description: string) => {
    const cleanedDescription = description.replace(/<[^>]*>/g, "").trim();
    return cleanedDescription.length > 0;
  };
  return (
    <div className="font-text text-text_color sm:mt-10  flex justify-center md:justify-around ">
      <div className="absolute top-[14rem] sm:top-[12rem]  md:top-[14rem] lg:top-[17rem]  lgd:relative  lg:flex bg-yellow/50 w-full h-[11rem] md:h-[15rem]  "></div>

      <div className="flex flex-col  md:flex-row gap-20 md:py-4 mt-8 lg:mt-14">
        <div className="flex flex-col justify-between xl:w-full  ">
          <div className="flex flex-col justify-center  ">
            <div className="flex justify-center text-center">
              <div className="flex flex-col lg:mb-10">
                <div className="flex flex-col xlw-full lg:flex-row items-center justify-center  mt-16  md:mb-0 sm:mt-0 gap-4 xl:gap-12 lg:my-8">
                  <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
                  <h1 className=" font-prata font-semibold text-center lg:text-2xl uppercase lg:w-[27rem]  ">
                    {title}
                  </h1>
                  <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
                </div>
                <h2 className="lg:text-md h-4 mt-4 lg:mt-0 lg:mb-4  mx-10  font-bold ">
                  Pour {capacity}
                </h2>
              </div>
            </div>
            {/* Section avec image et description */}
            {hasImage || isValidDescription(description) ? (
              <div className="flex flex-col mt-16  md:mt-24 lg:mt-10 min-h-[30rem] ">
                <div className="  flex flex-col items-center">
                  <div className="relative md:min-h-[22rem]">
                    {hasImage && (
                      <section className="flex flex-col lg:flex-row lg:justify-center lg:gap-8 sm:px-8 xl:mx-0">
                        <div className="flex justify-center items-center md:items-start  md:min-w-[39rem] xl:min-w-[48rem] mb-2 md:-mt-3 min-h-[14rem] ">
                          <Image
                            width={900}
                            height={400}
                            src={mainImage}
                            alt={`Photo de ${title}`}
                            className="object-scale-down max-h-[14rem] md:max-h-[22rem] md:w-[39rem] rounded-sm"
                            onLoad={() => setLoading(false)}
                          />
                        </div>

                        {/* Vignettes */}
                        <div className="flex flex-wrap justify-center gap-2 lg:justify-start lg:h-0 md:pt-2 mx-4 max-w-[25rem] md:max-w-[35rem] lg:max-w-[30rem]">
                          {imagesSlide.map((image, index) => (
                            <div
                              key={index}
                              className={`w-28 h-28 md:w-24 md:h-24 border-2 cursor-pointer rounded-md overflow-hidden ${
                                mainImage === image
                                  ? " border-4 border-[#bbbb57]"
                                  : ""
                              }`}
                              onClick={() => setMainImage(image)}
                            >
                              <Image
                                width={236}
                                height={134}
                                src={image}
                                alt={`Vignette ${index}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setMainImage(image);
                                  }
                                }}
                                aria-label={`Sélectionner la photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Affichage de la description si elle existe */}

                  {isValidDescription(description) ? (
                    <section className="flex justify-center w-full">
                      <div className="mt-12 md:mt-20 mb-8 md:mb-16 ">
                        <p
                          dangerouslySetInnerHTML={{ __html: description }}
                          className="prose text-[0.9rem] text-left  px-4 md:px-20 lg:px-6 w-96 max-w-[60rem] sm:min-w-[34rem] md:min-w-[52rem] mb-8"
                        />
                      </div>
                    </section>
                  ) : (
                    <section className="flex justify-center w-full ">
                      <div className=" my-16 md:my-24  mb-8 md:mb-20">
                        <p className="text-center text-lg text-gray-600 py-8 px-3">
                          Les informations complémentaires sont en cours de mise
                          à jour. <br />
                          Elles seront disponibles très prochainement !
                        </p>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            ) : (
              <section className="flex justify-center w-full md:mb-10">
                <div className="  my-8  md:my-24 lg:my-12">
                  <p className="text-center text-lg text-gray-900 py-8 px-3 ">
                    Les informations complémentaires sont en cours de mise à
                    jour. <br />
                    Elles seront disponibles très prochainement !
                  </p>
                </div>
              </section>
            )}

            <div className=" flex flex-col gap-16  md:mx-10 mb-20 md:mb-36 ">
              <div className="flex flex-col-reverse items-center  xl:flex-row md:gap-18 xl:items-start gap-12 xl:gap-28  ">
                <div>
                  <div className="mb-8 flex  justify-center xl:justify-start xl:ml-2">
                    <h2 className=" font-prata font-medium lg:text-xl uppercase tracking-[2px] ">
                      Les disponibilités
                      <span className="flex w-[11rem] lg:w-[13.5rem] mx-auto border-t-2  border-separator"></span>
                    </h2>
                  </div>
                  <section className=" md:p-2  w-[22rem] md:w-[40rem]  shadow-md rounded-md ">
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
                  </section>{" "}
                </div>

                {/* Section tarifs*/}
                <section className=" flex flex-col items-center  xl:justify-start mt-8 md:mt-0  xl:min-w-[30rem] max-w-[40rem] xl:mt-0  ">
                  <div className="flex flex-col gap-10 md:gap-14 xl:gap-8  items-center">
                    <div>
                      <h2 className=" font-prata font-medium text-center lg:text-xl tracking-[2px] uppercase lg:w-[27rem]   ">
                        Les Tarifs
                        <span className="flex justify-center w-[6rem] lg:w-[7rem] mx-auto border-t-2  border-separator"></span>
                      </h2>
                    </div>
                    <div className="flex flex-col md:flex-row xl:flex-col items-center gap-8 xl:gap-12 ">
                      <div className=" text-center xl:mt-8 border-[2px] w-[22rem] xl:w-[28rem] py-4 border-separator/20">
                        <p className="font-semibold ">Haute Saison</p>
                        <p className="italic text-center text-sm mt-2  px-5">
                          de Juin à Août
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
                      <div className=" text-center border-[2px] w-[22rem]  xl:w-[28rem] py-4 border-separator/20">
                        <p className="font-semibold">Basse Saison</p>
                        <p className=" mt-2 italic text-center text-sm  px-5">
                          de Septembre à Mai
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
                  </div>
                </section>
              </div>
            </div>
            <div className="flex flex-col items-center mb-44 text-[1.1rem]">
              <p className="w-2/3 text-center text-pretty ">
                Profitez d'un séjour inoubliable! Offrez-vous un moment de
                détente dans un cadre unique en Vendée. Contactez-nous dès
                maintenant pour réserver votre séjour.
              </p>
              <div className="flex justify-center mt-20 ">
                <Link
                  href={"/nous-contacter"}
                  className=" bg-yellow text-white  px-6 py-[0.6rem] rounded-full flex items-center gap-2 hover:bg-yellow/50 hover:text-text_color duration-300 shadow-md"
                >
                  <Mail size={20} />
                  Réservez dès maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

