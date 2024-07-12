import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({
      success: false,
      message: "Aucun fichier téléchargé.",
    });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.join(UPLOAD_DIR, file.name);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      image_path: `/uploads/${file.name}`,
      name: file.name,
    });
  } catch (error) {
    console.error("Erreur lors du téléchargement :", error);
    return NextResponse.json({
      success: false,
      message: "Erreur lors de l'upload.",
    });
  }
};

