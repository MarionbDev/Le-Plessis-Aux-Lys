import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Fonction pour récupérer l'email de l'admin depuis l'API
const getAdminEmail = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAdmin?time=${Date.now()}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store", // Empêche la mise en cache ??
        },
      },
    );

    const data = await res.json();
    console.log("data email", data);
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
    // console.log("email admin :", adminEmail);

    // Envoi de l'email via Resend
    const emailResult = await resend.emails.send({
      from: '"le-plessis-aux-lys" <noreply@le-plessis-aux-lys.fr>',
      to: adminEmail,
      subject: "Vous avez reçu un nouveau message",
      react: EmailTemplate({ firstname, lastname, email, phone, message }),
    });

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

