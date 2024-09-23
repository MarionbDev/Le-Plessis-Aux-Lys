"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Pegase() {
  const [imagesPegase, setImagesPegase] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("pegase");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesPegase = await getImagesFromBucket("pegase");

        setImagesPegase(imagesPegase);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesPegase.map((image) => image.path);

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
    <div className=" h-screen mb-96">
      {rates && (
        <RentalPage
          title="Suite familiale Pégase"
          subTitle=""
          description="Cette suite familial dispose de deux chambres. Une chambre avec un grand lit de 140 cm et d'un lit de 90 cm ainsi que la salle de bain. Une chambre avec un grand lit de 140 cm."
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="pegase"
        />
      )}
    </div>
  );
}

