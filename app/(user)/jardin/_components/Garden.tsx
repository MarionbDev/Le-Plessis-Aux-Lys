"use client";

import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Garden() {
  const [imagesJardin, setImagesJardin] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageJardin = await getImagesFromBucket("jardin");
        setImagesJardin(imageJardin);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const showNextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex !== null ? (prevIndex + 1) % imagesJardin.length : 0,
      );
    }
  };

  const showPrevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex !== null
          ? (prevIndex - 1 + imagesJardin.length) % imagesJardin.length
          : 0,
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowRight") showNextImage();
        if (event.key === "ArrowLeft") showPrevImage();
        if (event.key === "Escape") setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  if (loading) {
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
    <div className="my-10 pb-20 md:pb-0 pt-12 md:pt-32 px-6 md:mx-20 flex flex-col items-center md:mb-96 min-h-screen">
      <h3 className="font-prata text-2xl xl:w-[50rem] text-center mb-8 text-text_color">
        "Entre le calme et la beauté de nos jardins, laissez-vous charmer par la
        nature environnante"
      </h3>
      <span className="flex justify-center w-2/4 lg:w-2/6 border-t-2 py-6 md:py-10 border-separator"></span>

      <div className="flex justify-center mt-8 md:mt-0 md:justify-normal flex-wrap gap-[.5rem]">
        {imagesJardin.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative flex justify-center items-center overflow-hidden cursor-pointer"
          >
            <Image
              src={image.path}
              width={475}
              height={390}
              alt="photo du parc et jardin"
              className="object-cover w-4/5 h-auto md:h-[220px] md:w-full rounded-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal avec le carousel */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className=" relative  bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="absolute top-2 right-2 text-yellow bg-white hover:text-gray-900 p-1"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={30} />
            </Button>

            <Button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-yellow text-white px-1 rounded-full hover:bg-gray-900"
              onClick={showPrevImage}
            >
              {" "}
              <div className="rounded-full border-2  border-white">
                <ChevronLeft size={30} />
              </div>
            </Button>

            <Image
              src={imagesJardin[selectedIndex].path}
              width={800}
              height={600}
              alt="photo du parc et jardin"
              className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain rounded-md "
            />

            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow text-white p-1 rounded-full hover:bg-gray-900"
              onClick={showNextImage}
            >
              <div className="rounded-full border-2  border-white">
                <ChevronRight size={30} />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

