"use client";

import RentalPage from "@/app/_components/RentalPage";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";

const imagesChambre2 = [
  "/chambres/ch-2.jpg",
  "/chambres/ch-2-1.jpg",
  "/chambres/ch-2-2.jpg",
];

export default function RoomsTwo() {
  const { rates, loading, error } = useRentalRates("chambre 2");

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader size={50} className=" animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }
  return (
    <div className=" h-screen">
      {rates && (
        <RentalPage
          title="Chambre 2"
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imagesChambre2}
          rentalType="chambre 2"
        />
      )}
    </div>
  );
}

