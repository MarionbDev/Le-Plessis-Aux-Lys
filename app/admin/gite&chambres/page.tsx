"use client";

import CardPhotosAdmin from "@/app/_components/CardPhotoAdmin";
import { getImagesFromBucket } from "@/app/api/uploadPhotos/route";
import { useEffect, useState } from "react";

export default function GiteAndRooms() {
  const [gite, setGite] = useState<
    { path: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre1, setChambre1] = useState<
    { path: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre2, setChambre2] = useState<
    { path: string; orientation: "horizontal" | "vertical" }[]
  >([]);
  const [chambre3, setChambre3] = useState<
    { path: string; orientation: "horizontal" | "vertical" }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const giteUrls = await getImagesFromBucket("gite");
        const chambre1Urls = await getImagesFromBucket("chambre 1");
        const chambre2Urls = await getImagesFromBucket("chambre 2");
        const chambre3Urls = await getImagesFromBucket("chambre 3");

        setGite(giteUrls.map((path) => ({ path, orientation: "horizontal" })));
        setChambre1(
          chambre1Urls.map((path) => ({ path, orientation: "horizontal" })),
        );
        setChambre2(
          chambre2Urls.map((path) => ({ path, orientation: "horizontal" })),
        );
        setChambre3(
          chambre3Urls.map((path) => ({ path, orientation: "horizontal" })),
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleUploadComplete = (uploadedFileData: {
    orientation: "horizontal" | "vertical";
    id: string;
    path: string;
    fullPath: string;
  }) => {
    // Ajouter la nouvelle image téléchargée dans l'état local correspondant (gite, chambre1, chambre2, chambre3)
    if (uploadedFileData.fullPath.includes("gite")) {
      setGite((prevGite) => [...prevGite, uploadedFileData]);
    } else if (uploadedFileData.fullPath.includes("chambre1")) {
      setChambre1((prevChambre1) => [...prevChambre1, uploadedFileData]);
    } else if (uploadedFileData.fullPath.includes("chambre2")) {
      setChambre2((prevChambre2) => [...prevChambre2, uploadedFileData]);
    } else if (uploadedFileData.fullPath.includes("chambre3")) {
      setChambre3((prevChambre3) => [...prevChambre3, uploadedFileData]);
    }
  };

  return (
    <div className=" my-20 ">
      <div className="flex justify-around gap-y-20 flex-wrap mx-20 mt-10 ">
        <CardPhotosAdmin
          title="Gîte"
          slides={gite}
          onUploadComplete={handleUploadComplete}
          bucket="gite"
        />
        <CardPhotosAdmin
          title="Chambre 1"
          slides={chambre1}
          onUploadComplete={handleUploadComplete}
          bucket="chambre 1"
        />
        <CardPhotosAdmin
          title="Chambre 2"
          slides={chambre2}
          onUploadComplete={handleUploadComplete}
          bucket="chambre 2"
        />
        <CardPhotosAdmin
          title="Chambre 3"
          slides={chambre3}
          onUploadComplete={handleUploadComplete}
          bucket="chambre 3"
        />
      </div>
    </div>
  );
}

