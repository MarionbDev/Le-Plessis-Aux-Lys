import { useState } from "react";
import { uploadPhotos } from "../api/uploadPhotos/route";
import { UploadFileAdminProps, onUploadComplete } from "../types";

interface Props extends UploadFileAdminProps {
  bucket: string;
  onUploadComplete: (uploadedFileData: onUploadComplete) => void;
}

export default function UploadFileAdmin({ bucket, onUploadComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const getOrientation = (width: number, height: number) => {
    return width > height ? "horizontal" : "vertical";
  };

  const uploadFileImage = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected!");
      return;
    }

    const img = new Image();
    img.onload = async () => {
      const orientation = getOrientation(img.width, img.height);

      try {
        const uploadedFileData = await uploadPhotos(file, orientation, bucket);
        console.log("Uploaded file:", uploadedFileData);
        setUploadedFilePath(uploadedFileData.fullPath);
        // onUploadComplete(uploadedFileData);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <div>
      <div className="flex flex-col">
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="button" onClick={uploadFileImage}>
          Télécharger
        </button>
      </div>
    </div>
  );
}

