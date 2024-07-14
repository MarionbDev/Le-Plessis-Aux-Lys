"use client";

import RentalPage from "@/app/_components/RentalPage";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";

const imagesGite = ["/gite/gite.jpg", "/gite/gite2.jpg", "/gite/gite3.jpg"];

export default function Gîte() {
  const { rates, loading, error } = useRentalRates("gite");

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader size={50} className=" animate-spin" />
      </div>
    );
  }

  return (
    <div className=" h-screen">
      {rates && (
        <RentalPage
          title="Gite de 2 à 4 personnes"
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imagesGite}
          rentalType="gite"
        />
      )}
    </div>
  );
}

