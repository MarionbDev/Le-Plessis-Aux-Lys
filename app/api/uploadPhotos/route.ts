import { ImageType } from "@/app/types";
import supabase from "@/lib/database";

const construireUrlImage = (bucket: string, fileName: string): string => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
  // console.log(`URL construite: ${url}`);
  return url;
};

export const getImagesFromBucket = async (
  bucketName: string,
): Promise<ImageType[]> => {
  const { data, error } = await supabase.storage.from(bucketName).list();

  if (error) {
    console.error(
      `Erreur lors de la récupération des images du bucket ${bucketName}:`,
      error,
    );
    throw error;
  }

  return data
    .filter((item) => !item.name.endsWith(".emptyFolderPlaceholder"))
    .map((item) => ({
      path: construireUrlImage(bucketName, item.name),
      orientation: "horizontal",
      fileName: item.name,
    }));
};

export const uploadPhotos = async (
  file: File,
  orientation: "horizontal" | "vertical",
  bucket: string,
) => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    return {
      orientation,
      id: data.id,
      fullPath: construireUrlImage(bucket, data.path),
      image_path: data.path,
    };
  } catch (error: any) {
    console.error("Error uploading file :", error.message);
    throw error;
  }
};

export const deleteUploadFile = async (fileName: string, bucket: string) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([fileName]);

    if (error) {
      console.error(
        `Failed to delete file: ${fileName} from bucket: ${bucket}`,
        error,
      );
      throw error;
    }
  } catch (error: any) {
    console.error("Error deleting file:", error.message);
    throw error;
  }
};

