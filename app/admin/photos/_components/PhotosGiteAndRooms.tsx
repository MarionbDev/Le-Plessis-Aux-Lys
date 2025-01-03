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
  const [petiteOurse, setPetiteOurse] = useState<ImageType[]>([]);
  const [grandeOurse, setGrandeOurse] = useState<ImageType[]>([]);

  const [orion, setOrion] = useState<ImageType[]>([]);
  const [cassiopee, setCassiopee] = useState<ImageType[]>([]);
  const [andromede, setAndromede] = useState<ImageType[]>([]);
  const [pegase, setPegase] = useState<ImageType[]>([]);

  const [jardin, setJardin] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const petiteOurseImages = await getImagesFromBucket("petiteOurse");
        const grandeOurseImages = await getImagesFromBucket("grandeOurse");
        const orionImages = await getImagesFromBucket("orion");
        const cassiopeeImages = await getImagesFromBucket("cassiopee");
        const andromedeImages = await getImagesFromBucket("andromede");
        const pegaseImages = await getImagesFromBucket("pegase");
        const jardinImages = await getImagesFromBucket("jardin");

        setPetiteOurse(petiteOurseImages);
        setGrandeOurse(grandeOurseImages);
        setOrion(orionImages);
        setCassiopee(cassiopeeImages);
        setAndromede(andromedeImages);
        setPegase(pegaseImages);
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
    const newImage: ImageType = {
      path: uploadedFileData.fullPath,
      orientation: uploadedFileData.orientation,
      fileName: uploadedFileData.fullPath.split("/").pop() ?? "",
    };

    if (uploadedFileData.fullPath.includes("petiteOurse")) {
      setPetiteOurse((prevPetiteOurse) => [...prevPetiteOurse, newImage]);
    } else if (uploadedFileData.fullPath.includes("grandeOurse")) {
      setGrandeOurse((prevGrandeOurse) => [...prevGrandeOurse, newImage]);
    } else if (uploadedFileData.fullPath.includes("orion")) {
      setOrion((prevOrion) => [...prevOrion, newImage]);
    } else if (uploadedFileData.fullPath.includes("cassiopee")) {
      setCassiopee((prevCassiopee) => [...prevCassiopee, newImage]);
    } else if (uploadedFileData.fullPath.includes("andromede")) {
      setAndromede((prevAndromede) => [...prevAndromede, newImage]);
    } else if (uploadedFileData.fullPath.includes("pegase")) {
      setPegase((prevPegase) => [...prevPegase, newImage]);
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
      // Appeler la fonction pour supprimer le fichier
      await deleteUploadFile(fileName, bucket);

      // Mettre à jour l'état après suppression basé sur le bucket
      if (bucket === "petiteOurse") {
        setPetiteOurse((prev) =>
          prev.filter((img) => img.fileName !== fileName),
        );
      } else if (bucket === "grandeOurse") {
        setGrandeOurse((prev) =>
          prev.filter((img) => img.fileName !== fileName),
        );
      } else if (bucket === "orion") {
        setOrion((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "cassiopee") {
        setCassiopee((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "andromede") {
        setAndromede((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "pegase") {
        setPegase((prev) => prev.filter((img) => img.fileName !== fileName));
      } else if (bucket === "jardin") {
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
    <div className=" py-20 mt-6 lg:mt-0">
      <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-8 lg:my-8">
        <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
        <h1 className=" text-text_color font-semibold text-center lg:text-lg uppercase ">
          Mise à jour des photos
        </h1>
        <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
      </div>
      <div className="py-20 lg:py-10 mx-4 lg:mt-0 flex justify-center">
        <div className="flex justify-center lg:justify-start  gap-x-10 gap-y-20 flex-wrap lg:pl-28 ">
          <CardPhotosAdmin
            title="Le logis de la petite Ourse"
            slides={petiteOurse}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="petiteOurse"
          />
          <CardPhotosAdmin
            key={JSON.stringify(grandeOurse)}
            title="Le logis de la grande Ourse"
            slides={grandeOurse}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="grandeOurse"
          />
          <CardPhotosAdmin
            title="Orion"
            slides={orion}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="orion"
          />
          <CardPhotosAdmin
            title="Cassiopée"
            slides={cassiopee}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="cassiopee"
          />

          <CardPhotosAdmin
            title="Andromède"
            slides={andromede}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="andromede"
          />
          <CardPhotosAdmin
            title="Pégase"
            slides={pegase}
            onUploadComplete={handleUploadComplete}
            onDelete={handleDelete}
            bucket="pegase"
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
    </div>
  );
}

