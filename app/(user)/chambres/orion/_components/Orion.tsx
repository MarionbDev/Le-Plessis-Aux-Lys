"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalDetails } from "@/hooks/useRentalDetails";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Orion() {
  const [imagesOrion, setImagesOrion] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("orion");
  const { rentals } = useRentalDetails("orion");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesOrion = await getImagesFromBucket("orion");

        setImagesOrion(imagesOrion);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesOrion.map((image) => image.path);

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
    <div className="">
      {rates && rentals ? (
        <RentalPage
          title={rentals.title_rental}
          capacity={rentals.capacity_rental}
          description={rentals.description_rental}
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="orion"
        />
      ) : null}
    </div>
  );
}
