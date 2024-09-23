"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function LaPetiteOurse() {
  const [imagesPetiteOurse, setImagesPetiteOurse] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("petiteOurse");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesPetiteOurse = await getImagesFromBucket("petiteOurse");

        setImagesPetiteOurse(imagesPetiteOurse);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesPetiteOurse.map((image) => image.path);

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
    <div className=" h-screen mb-96 ">
      {rates && (
        <RentalPage
          title="Le logis de la petite Ourse"
          subTitle="Pour 2 à 4 personnes"
          description=""
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="petiteOurse"
        />
      )}
    </div>
  );
}

