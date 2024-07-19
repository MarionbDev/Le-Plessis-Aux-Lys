"use client";

import CardPhotosAdmin from "@/app/_components/CardPhotoAdmin";
import {
  deleteUploadFile,
  getImagesFromBucket,
} from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useEffect, useState } from "react";

// Fonction pour récupérer le nom du fichier depuis le chemin complet
const extractFileName = (fullPath: string): string => {
  return fullPath.split("/").pop() ?? "";
};

export default function GiteAndRooms() {
  const [gite, setGite] = useState<ImageType[]>([]);
  const [chambre1, setChambre1] = useState<ImageType[]>([]);
  const [chambre2, setChambre2] = useState<ImageType[]>([]);
  const [chambre3, setChambre3] = useState<ImageType[]>([]);

  useEffect(() => {
    console.log("useEffect in GiteAndRooms called");
    // ...
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const giteImages = await getImagesFromBucket("gite");
        const chambre1Images = await getImagesFromBucket("chambre 1");
        const chambre2Images = await getImagesFromBucket("chambre 2");
        const chambre3Images = await getImagesFromBucket("chambre 3");
        // console.log("Gite images:", giteImages);
        // console.log("Chambre 1 images:", chambre1Images);
        // console.log("Chambre 2 images:", chambre2Images);
        // console.log("Chambre 3 images:", chambre3Images);
        // Mettre à jour les états avec les nouvelles images

        // Mettre à jour les états avec les nouvelles images
        setGite(giteImages);
        setChambre1(chambre1Images);
        setChambre2(chambre2Images);
        setChambre3(chambre3Images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleUploadComplete = (uploadedFileData: {
    orientation: "horizontal" | "vertical";
    id: string;
    image_path: string;
    fullPath: string;
  }) => {
    console.log("Upload complete data:", uploadedFileData);

    const newImage: ImageType = {
      path: uploadedFileData.fullPath,
      orientation: uploadedFileData.orientation,
      fileName: uploadedFileData.fullPath.split("/").pop() ?? "",
    };

    if (uploadedFileData.fullPath.includes("gite")) {
      setGite((prevGite) => [...prevGite, newImage]);
    } else if (uploadedFileData.fullPath.includes("chambre 1")) {
      setChambre1((prevChambre1) => [...prevChambre1, newImage]);
    } else if (uploadedFileData.fullPath.includes("chambre 2")) {
      setChambre2((prevChambre2) => [...prevChambre2, newImage]);
    } else if (uploadedFileData.fullPath.includes("chambre 3")) {
      setChambre3((prevChambre3) => [...prevChambre3, newImage]);
    }
  };

  const handleDelete = async (fileName: string, bucket: string) => {
    // Définir le bucket
    try {
      console.log(
        `Attempting to delete file: ${fileName} from bucket: ${bucket}`,
      );

      // Appeler la fonction pour supprimer le fichier
      await deleteUploadFile(fileName, bucket);

      // Mettre à jour l'état après suppression basé sur le bucket
      if (bucket === "gite") {
        setGite((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "chambre 1") {
        setChambre1((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "chambre 2") {
        setChambre2((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "chambre 3") {
        setChambre3((prev) => prev.filter((img) => img.fileName !== fileName));
      } else {
        console.error(`Unknown bucket: ${bucket}`);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <div className=" my-20 ">
      <div className="flex justify-around gap-y-20 flex-wrap mx-20 mt-10 ">
        <CardPhotosAdmin
          title="Gîte"
          slides={gite}
          onUploadComplete={handleUploadComplete}
          onDelete={handleDelete}
          bucket="gite"
        />
        <CardPhotosAdmin
          title="Chambre 1"
          slides={chambre1}
          onUploadComplete={handleUploadComplete}
          onDelete={handleDelete}
          bucket="chambre 1"
        />
        <CardPhotosAdmin
          title="Chambre 2"
          slides={chambre2}
          onUploadComplete={handleUploadComplete}
          onDelete={handleDelete}
          bucket="chambre 2"
        />

        <CardPhotosAdmin
          title="Chambre 3"
          slides={chambre3}
          onUploadComplete={handleUploadComplete}
          onDelete={handleDelete}
          bucket="chambre 3"
        />
      </div>
    </div>
  );
}

