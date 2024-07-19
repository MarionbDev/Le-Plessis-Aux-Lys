"use client";

import CardPhotosAdmin from "@/app/_components/CardPhotoAdmin";
import {
  deleteUploadFile,
  getImagesFromBucket,
} from "@/app/api/uploadPhotos/route";
import { ImageType } from "@/app/types";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function GiteAndRooms() {
  const [gite, setGite] = useState<ImageType[]>([]);
  const [chambre1, setChambre1] = useState<ImageType[]>([]);
  const [chambre2, setChambre2] = useState<ImageType[]>([]);
  const [chambre3, setChambre3] = useState<ImageType[]>([]);
  const [jardin, setJardin] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const giteImages = await getImagesFromBucket("gite");
        const chambre1Images = await getImagesFromBucket("chambre 1");
        const chambre2Images = await getImagesFromBucket("chambre 2");
        const chambre3Images = await getImagesFromBucket("chambre 3");
        const jardinImages = await getImagesFromBucket("jardin");

        setGite(giteImages);
        setChambre1(chambre1Images);
        setChambre2(chambre2Images);
        setChambre3(chambre3Images);
        setJardin(jardinImages);
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
    } else if (uploadedFileData.fullPath.includes("garden")) {
      setJardin((prevJardin) => [...prevJardin, newImage]);
    }

    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve({ name: "Sonner" });
        }, 2000),
      );
    toast.promise(promise(), {
      loading: "Téléchargement de l'image en-cours...",
      success: (data) => {
        return `Téléchargement de l'image réussi ! `;
      },
      error: "Error",
    });
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
      } else if (bucket === "chambre 3") {
        setJardin((prev) => prev.filter((img) => img.fileName !== fileName));
      } else {
        console.error(`Unknown bucket: ${bucket}`);
      }

      await getImagesFromBucket("gite");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <div className=" ">
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

        <CardPhotosAdmin
          title="Jardin"
          slides={jardin}
          onUploadComplete={handleUploadComplete}
          onDelete={handleDelete}
          bucket="jardin"
        />
      </div>
      <Toaster />
    </div>
  );
}

