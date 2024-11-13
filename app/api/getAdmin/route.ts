import supabase from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// Fonction pour gérer la méthode GET
export const GET = async (req: NextRequest) => {
  try {
    // Récupérer l'email de l'admin depuis la base de données Supabase
    const { data, error } = await supabase
      .from("admin")
      .select("email")
      .eq("id", 1) // Remplacez selon la structure de votre table
      .single(); // Récupérer un seul enregistrement

    if (error || !data) {
      return NextResponse.json(
        { error: "Unable to fetch admin email" },
        { status: 500 },
      );
    }

    // Renvoyer l'email de l'administrateur au client
    return NextResponse.json({ admin: data.email });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

