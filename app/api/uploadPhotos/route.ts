import supabase from "@/lib/database";

export const getImagesFromBucket = async (bucket: string) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list();
    if (error) {
      throw error;
    }

    const urls = data
      .filter((file) => !file.name.endsWith(".emptyFolderPlaceholder")) // Exclure les placeholders vides
      .map((file) => {
        const { publicUrl } = supabase.storage
          .from(bucket)
          .getPublicUrl(file.name).data;
        return publicUrl;
      });

    return urls;
  } catch (error: any) {
    console.error("Error fetching images :", error.message);
    throw error;
  }
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
    console.log("Uplaod file :", data);

    return { ...data, orientation };
  } catch (error: any) {
    console.error("Error uploading file :", error.message);
    throw error;
  }
};

export const deleteUploadFile = async (filePath: string) => {
  try {
    const { error } = await supabase.storage
      .from("rentals_images")
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error("Error deleting file :", error.message);
    throw error;
  }
};

