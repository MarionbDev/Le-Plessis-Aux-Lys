"use client";

import RentalPage from "@/app/_components/RentalPage";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";

const imagesChambre1 = ["/chambres/ch-1.jpg", "/chambres/ch-1-1.jpg"];

export default function RoomsOne() {
  const { rates, loading, error } = useRentalRates("chambre 1");

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
          title="Chambre 1"
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imagesChambre1}
          rentalType="chambre 1"
        />
      )}
    </div>
  );
}

