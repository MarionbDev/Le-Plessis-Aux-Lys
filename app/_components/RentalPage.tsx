"use client";
import { EmblaOptionsType } from "embla-carousel";
import BookingCalendar from "../_components/calendar/BookingCalendar";
import EmblaCarousel from "../_components/carousel/EmblaCarousel";

type PropType = {
  title: string;
  lowSeasonNightRate: number;
  lowSeasonWeeklyRate: number;
  highSeasonNightRate: number;
  highSeasonWeeklyRate: number;
  imagesSlide: string[];
};

const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };

export default function RentalPage({
  title,
  lowSeasonNightRate,
  lowSeasonWeeklyRate,
  highSeasonNightRate,
  highSeasonWeeklyRate,
  imagesSlide,
}: PropType) {
  return (
    <div className="font-text text-text_color pt-[6.4rem] gap-16">
      <div className="flex justify-around items-center ml-10">
        <div className="flex flex-col items-center mx-8 px-10 py-4  ">
          <h3 className="lg:text-lg mb-8  font-bold  ">{title}</h3>
          <section className="flex justify-center gap-14   w-4/5 py-2 bg-[#b7ae47]/10 shadow-basic ">
            <div>
              <p className=" font-semibold">Tarifs</p>
              <p>La nuit </p>
              <p>La semaine</p>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Basse Saison</p>
                <p>{lowSeasonNightRate} €</p>
                <p>{lowSeasonWeeklyRate} €</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Haute Saison</p>
                <p>{highSeasonNightRate} €</p>
                <p>{highSeasonWeeklyRate} €</p>
              </div>
            </div>
          </section>
          <section className="mt-10 p-4 border-gold border-2 ">
            <div className=" ">
              <BookingCalendar />
            </div>
            <div>
              <ul className="flex justify-end gap-10 italic text-[0.8rem]">
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-white border-2 rounded-full"></span>
                  <p>Disponible</p>
                </li>
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-red-500 border-2 rounded-full"></span>
                  <p>Loué</p>
                </li>
                <li className="flex gap-2 items-center">
                  <span className=" w-4 h-4 bg-white border-2 rounded-full relative flex items-center">
                    <div className="absolute h-px w-3 bg-slate-400 -rotate-45"></div>
                  </span>
                  <p>Indisponible</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <section className=" flex  w-[44rem] pt-[6rem]">
          <EmblaCarousel slides={imagesSlide} options={OPTIONS} />
        </section>
      </div>
    </div>
  );
}

