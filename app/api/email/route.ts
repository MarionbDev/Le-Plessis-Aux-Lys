import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Fonction pour récupérer l'email de l'admin depuis l'API
const getAdminEmail = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAdmin`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-store", // Empêche la mise en cache ??
      },
      cache: "no-store",
    });
    console.log("get admin email ", res);

    const data = await res.json();
    // console.log("data email", data);
    if (res.ok && data.admin) {
      return data.admin;
    } else {
      throw new Error("Unable to fetch admin email");
    }
  } catch (error) {
    console.error("Error fetching admin email:", error);
    throw new Error("Error fetching admin email");
  }
};

// Fonction POST pour gérer l'envoi d'email
export const POST = async (request: NextRequest) => {
  try {
    // Parse le corps de la requête (le formulaire)
    const body = await request.json();
    const { firstname, lastname, email, phone, message } = body;

    // Récupérer l'email de l'admin depuis l'API
    const adminEmail = await getAdminEmail();

    // Envoi de l'email via Resend
    console.log("Sending email to:", adminEmail);
    const emailResult = await resend.emails.send({
      from: '"le-plessis-aux-lys" <noreply@le-plessis-aux-lys.fr>',
      // to: adminEmail,
      to: "marionbaston84@gmail.com",
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

