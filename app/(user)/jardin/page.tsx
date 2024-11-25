"use client";

import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useRentalRates } from "@/hooks/useRentalRates";
import { motion } from "framer-motion";
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
      <div className="flex justify-center items-center h-screen ">
        <Loader size={50} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }

  return (
    <div className="my-10 pt-12 md:pt-32 px-6 md:mx-20 flex flex-col items-center md:mb-96 min-h-screen">
      <h3 className="font-prata text-2xl xl:w-[50rem] text-center mb-16 text-text_color ">
        "Entre le calme et la beauté de nos jardins, laissez-vous charmer par la
        nature environnante"
      </h3>
      <span className="flex justify-center w-2/4 border-t-2 py-6 md:py-10 border-separator"></span>

      <div className="flex flex-wrap gap-[.5rem] ">
        {imagesJardin.map((image, index) => (
          <motion.div
            key={index}
            className="relative flex justify-center items-center overflow-hidden rounded-sm  "
          >
            <Image
              src={image.path}
              width={475}
              height={390}
              alt={image.path}
              className="object-scale-down w-4/5  md:h-[250px] md:w-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

