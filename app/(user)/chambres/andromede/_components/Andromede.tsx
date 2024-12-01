"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalDetails } from "@/hooks/useRentalDetails";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Andromede() {
  const [imagesAndromede, setImagesAndromede] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("andromede");
  const { rentals } = useRentalDetails("andromede");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesAndromede = await getImagesFromBucket("andromede");

        // Mettre à jour les états avec les nouvelles images
        setImagesAndromede(imagesAndromede);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesAndromede.map((image) => image.path);

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
          rentalType="andromede"
        />
      ) : null}
    </div>
  );
}

