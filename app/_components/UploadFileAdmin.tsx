import { Button } from "@/components/ui/button";
import { useState } from "react";
import { uploadPhotos } from "../api/uploadPhotos/route";
import { UploadFileAdminProps, onUploadComplete } from "../types";

interface Props extends UploadFileAdminProps {
  bucket: string;
  onUploadComplete: (uploadedFileData: onUploadComplete) => void;
}

export default function UploadFileAdmin({ bucket, onUploadComplete }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>([]);
  console.log("UploadFileAdmin initialized with bucket:", bucket);
  console.log(
    "onUploadComplete provided:",
    typeof onUploadComplete === "function",
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    setFiles(selectedFiles);
  };

  const getOrientation = (width: number, height: number) => {
    return width > height ? "horizontal" : "vertical";
  };

  const uploadFiles = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (files.length === 0) {
      console.error("No files selected!");
      return;
    }

    for (const file of files) {
      const img = new Image();
      img.onload = async () => {
        const orientation = getOrientation(img.width, img.height);

        try {
          if (!bucket) {
            console.error("Bucket name is not specified!");
            return;
          }

          const uploadedFileData = await uploadPhotos(
            file,
            orientation,
            bucket,
          );
          console.log("Uploaded file admin:", uploadedFileData);
          const fileData: onUploadComplete = {
            orientation: uploadedFileData.orientation,
            id: uploadedFileData.id,
            fullPath: uploadedFileData.fullPath,
            image_path: uploadedFileData.image_path,
          };

          setUploadedFilePaths((prevPaths) => [
            ...prevPaths,
            uploadedFileData.fullPath,
          ]);
          console.log("Calling onUploadComplete with:", fileData);
          onUploadComplete(fileData);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      console.log("Setting image src for preview.");
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div>
      <div className="flex flex-col  justify-center items-center">
        <input
          type="file"
          id="upload"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="  border cursor-pointer text-[0.9rem]"
        />
        <Button
          type="button"
          onClick={uploadFiles}
          className="  mt-4  bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-[0.9rem] "
        >
          Télécharger
        </Button>
      </div>
    </div>
  );
}

