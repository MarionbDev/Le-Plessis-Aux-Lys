"use client";

import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Garden() {
  const [imagesJardin, setImagesJardin] = useState<ImageType[]>([]);

  const { rates, loading, error } = useRentalRates("jardin");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesChambre1 = await getImagesFromBucket("jardin");

        setImagesJardin(imagesChambre1);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

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
    <div className="mx-20 flex flex-col items-center">
      {/* <h2 className="mt-40 mb-20">Jardin</h2> */}
      <div className="mt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {imagesJardin.map((image, index) => (
          <div key={index} className="flex justify-center items-center ">
            <Image
              src={image.path}
              width={image.orientation === "horizontal" ? 360 : 320}
              height={image.orientation === "horizontal" ? 300 : 200}
              priority
              alt={image.path}
              className="p-0 shadow-basic"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

