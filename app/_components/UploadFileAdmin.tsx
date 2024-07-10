import { useState } from "react";
import { upload } from "../api/uploadFile/route";
import { UploadFileAdminProps } from "../types";

export default function UploadFileAdmin({
  onUploadComplete,
}: UploadFileAdminProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const getOrientation = (width: number, height: number) => {
    return width > height ? "horizontal" : "vertical";
  };

  const uploadFileImage = async (event: React.FormEvent) => {
    event.preventDefault();

    // Vérifier si file est null
    if (!file) {
      console.error("No file selected!");
      return;
    }

    const img = new Image();
    img.onload = async () => {
      const orientation = getOrientation(img.width, img.height);

      try {
        const uploadedFileData = await upload(file, orientation);
        console.log("Uploaded file:", uploadedFileData);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <>
      <form onSubmit={uploadFileImage}>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Télécharger</button>
      </form>
    </>
  );
}

