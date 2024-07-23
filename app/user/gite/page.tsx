"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Gîte() {
  const [imagesGite, setGite] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("gite");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesGite = await getImagesFromBucket("gite");
        console.log("gite image", imagesGite);

        // Mettre à jour les états avec les nouvelles images
        setGite(imagesGite);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesGite.map((image) => image.path);

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
          title="Gite de 2 à 4 personnes"
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="gite"
        />
      )}
    </div>
  );
}

