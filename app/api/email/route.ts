import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import supabase from "@/lib/database";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Fonction POST pour gérer l'envoi d'email
export const POST = async (request: NextRequest) => {
  try {
    // Parse les données du formulaire
    const body = await request.json();
    const { firstname, lastname, email, phone, message } = body;

    // Récupérer l'email de l'admin depuis Supabase
    const { data: adminData, error } = await supabase
      .from("admin")
      .select("email")
      .eq("id", 1)
      .single();

    if (error || !adminData) {
      console.error("Error fetching admin email:", error);
      throw new Error("Unable to fetch admin email");
    }

    const adminEmail = adminData.email;

    // Envoi de l'email via Resend
    console.log("Sending email to:", adminEmail);
    const emailResult = await resend.emails.send({
      from: '"le-plessis-aux-lys" <noreply@le-plessis-aux-lys.fr>',
      to: adminEmail,
      subject: "Vous avez reçu un nouveau message",
      react: EmailTemplate({ firstname, lastname, email, phone, message }),
    });

    // Revalidation après avoir mis à jour les données de l'admin
    revalidatePath("/api/getAdmin"); // Marque la balise associée comme obsolète et force une nouvelle récupération

    return NextResponse.json({
      message: "Email successfully sent!",
      emailResult,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("email")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.error("Error fetching admin email:", error);
      return NextResponse.json(
        { error: "Admin email not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      email: data.email,
    });
  } catch (error) {
    console.log("Error fetching email :", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

