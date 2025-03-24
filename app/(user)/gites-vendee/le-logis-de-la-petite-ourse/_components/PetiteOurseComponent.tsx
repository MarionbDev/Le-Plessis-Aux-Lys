"use client";

import RentalPage from "@/app/_components/RentalPage";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalDetails } from "@/hooks/useRentalDetails";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function LaPetiteOurse() {
  const [imagesPetiteOurse, setImagesPetiteOurse] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<ImageType | null>(null);

  const { rates, loading: ratesLoading, error } = useRentalRates("petiteOurse");
  const { rentals, loading: rentalsLoading } = useRentalDetails("petiteOurse");
  const fetchImages = useCallback(async () => {
    try {
      const images = await getImagesFromBucket("petiteOurse");
      setImagesPetiteOurse(images);
      if (images.length > 0) {
        setMainImage(images[0]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // const imageUrls = useMemo(
  //   () => imagesPetiteOurse.map((image) => image.path),
  //   [imagesPetiteOurse],
  // );
  const imageUrls = imagesPetiteOurse.map((image) => {
    return image.path;
  });

  if (loading || ratesLoading || rentalsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} className="animate-spin" />
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
          rentalType="petiteOurse"
        />
      ) : null}
    </div>
  );
}

