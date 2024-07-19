"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const imagesChambre3 = ["/chambres/ch-3.jpg", "/chambres/ch-3-1.jpg"];

export default function RoomThree() {
  const [imagesChambre3, setImagesChambre3] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("chambre 3");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesChambre3 = await getImagesFromBucket("chambre 3");

        // Mettre à jour les états avec les nouvelles images
        setImagesChambre3(imagesChambre3);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesChambre3.map((image) => image.path);

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
          title="Chambre 3"
          lowSeasonNightRate={rates.price_low_season_night}
          lowSeasonWeeklyRate={rates.price_low_season_week}
          highSeasonNightRate={rates.price_high_season_night}
          highSeasonWeeklyRate={rates.price_high_season_week}
          imagesSlide={imageUrls}
          rentalType="chambre 3"
        />
      )}
    </div>
  );
}

