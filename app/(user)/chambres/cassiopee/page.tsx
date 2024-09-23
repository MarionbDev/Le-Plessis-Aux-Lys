"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cassiopee() {
  const [imagesCassiopee, setImagesCassiopee] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("cassiopee");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesCassiopee = await getImagesFromBucket("cassiopee");

        setImagesCassiopee(imagesCassiopee);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesCassiopee.map((image) => image.path);

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
          title="Chambre Cassiopée"
          subTitle=""
          description=""
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="cassiopee"
        />
      )}
    </div>
  );
}

