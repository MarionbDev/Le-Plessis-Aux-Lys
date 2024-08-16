"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function RoomsTwo() {
  const [imagesChambre2, setImageChambre2] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("chambre 2");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesChambre2 = await getImagesFromBucket("chambre 2");

        setImageChambre2(imagesChambre2);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesChambre2.map((image) => image.path);

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
          imagesSlide={imageUrls}
          rentalType="chambre 2"
        />
      )}
    </div>
  );
}

