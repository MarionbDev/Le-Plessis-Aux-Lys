"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function RoomsOne() {
  const [imagesChambre1, setImagesChambre1] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("chambre 1");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesChambre1 = await getImagesFromBucket("chambre 1");

        setImagesChambre1(imagesChambre1);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesChambre1.map((image) => image.path);

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
          imagesSlide={imageUrls}
          rentalType="chambre 1"
        />
      )}
    </div>
  );
}

