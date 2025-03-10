"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalDetails } from "@/hooks/useRentalDetails";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cassiopee() {
  const [imagesCassiopee, setImagesCassiopee] = useState<ImageType[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  const { rates, loading: ratesLoading, error } = useRentalRates("cassiopee");
  const { rentals, loading: rentalsLoading } = useRentalDetails("cassiopee");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImagesFromBucket("cassiopee");
        setImagesCassiopee(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setImagesLoading(false);
      }
    };

    fetchImages();
  }, []);

  const imageUrls = imagesCassiopee.map((image) => image.path);

  if (ratesLoading || rentalsLoading || imagesLoading) {
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
    <div>
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
          rentalType="cassiopee"
        />
      ) : null}
    </div>
  );
}

