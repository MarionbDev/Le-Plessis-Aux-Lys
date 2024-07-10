"use client";

import CardPhotosAdmin from "@/app/_components/CardPhotoAdmin";
import { getImagesFromBucket } from "@/app/api/uploadFile/route";
import { useEffect, useState } from "react";

export default function GiteAndRooms() {
  const [gite, setGite] = useState<
    { url: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre1, setChambre1] = useState<
    { url: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre2, setChambre2] = useState<
    { url: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre3, setChambre3] = useState<
    { url: string; orientation: "horizontal" | "vertical" }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const giteUrls = await getImagesFromBucket("gite");
        const chambre1Urls = await getImagesFromBucket("chambre1");
        const chambre2Urls = await getImagesFromBucket("chambre2");
        const chambre3Urls = await getImagesFromBucket("chambre3");

        setGite(giteUrls.map((url) => ({ url, orientation: "horizontal" })));
        setChambre1(
          chambre1Urls.map((url) => ({ url, orientation: "horizontal" })),
        );
        setChambre2(
          chambre2Urls.map((url) => ({ url, orientation: "horizontal" })),
        );
        setChambre3(
          chambre3Urls.map((url) => ({ url, orientation: "horizontal" })),
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleUploadComplete = (uploadedFileData: {
    url: string;
    orientation: "horizontal" | "vertical";
    id: string;
    path: string;
    fullPath: string;
  }) => {
    // Ajouter la nouvelle image téléchargée dans l'état local correspondant (gite, chambre1, chambre2, chambre3)
    setGite([...gite, uploadedFileData]); // Adapter pour les autres chambres si nécessaire
  };

  return (
    <div className=" my-20 ">
      <div className="flex justify-around gap-y-20 flex-wrap mx-20 mt-10 ">
        <CardPhotosAdmin
          title="Gîte"
          slides={gite}
          onUploadComplete={handleUploadComplete}
        />
        <CardPhotosAdmin
          title="Chambre 1"
          slides={chambre1}
          onUploadComplete={handleUploadComplete}
        />
        <CardPhotosAdmin
          title="Chambre 2"
          slides={chambre2}
          onUploadComplete={handleUploadComplete}
        />
        <CardPhotosAdmin
          title="Chambre 3"
          slides={chambre3}
          onUploadComplete={handleUploadComplete}
        />
      </div>
    </div>
  );
}

