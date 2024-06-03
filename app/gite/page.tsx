"use client";
import Image from "next/image";
import gite1 from "../../public/gite/gite.jpg";
import gite2 from "../../public/gite/gite2.jpg";
import gite3 from "../../public/gite/gite3.jpg";
import BookingCalendar from "../_components/calendar/BookingCalendar";

export default function Gîte() {
  // const imagesGite = ["/gite/gite.jpg", "/gite/gite2.jpg", "/gite/gite3.jpg"];
  return (
    <div className=" my-32">
      <h3 className="ml-10 mt-32 lg:text-lg">Gîte pour 2 à 4 personnes</h3>
      {/* <EmblaCarousel slides={imagesGite} /> */}
      <div className="flex justify-between mx-12">
        <div className="mt-20 ">
          <BookingCalendar />
          <ul className="flex gap-10 italic text-sm">
            <li>Disponible</li>
            <li>Loué</li>
            <li>Indisponible</li>
          </ul>
          <div className="mt-20">
            <div className="flex gap-10">
              <div>
                <p>Tarifs</p>
                <p>La nuit </p>
                <p>La semaine</p>
              </div>
              <div className=" ">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <p>Basse Saison</p>
                    <p>90 €</p>
                    <p>560 €</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Haute Saison</p>
                    <p>110 €</p>
                    <p>690 €</p>
                  </div>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-10  justify-center items-center">
          <li className=" ">
            <Image src={gite1} width={500} height={300} alt="photo du gite" />
          </li>
          <div className=" flex gap-10">
            <li>
              <Image src={gite2} width={300} height={300} alt="photo du gite" />
            </li>
            <li>
              <Image src={gite3} width={300} height={300} alt="photo du gite" />
            </li>
          </div>{" "}
        </ul>
      </div>
    </div>
  );
}

