"use client";

import RentalPage from "@/app/_components/RentalPage";

const imagesGite = ["/gite/gite.jpg", "/gite/gite2.jpg", "/gite/gite3.jpg"];

export default function Gîte() {
  return (
    <div className=" h-screen">
      <RentalPage
        title="Gite de 2 à 4 personnes"
        lowSeasonNightRate={90}
        lowSeasonWeeklyRate={560}
        highSeasonNightRate={110}
        highSeasonWeeklyRate={680}
        imagesSlide={imagesGite}
      />{" "}
    </div>
  );
}

