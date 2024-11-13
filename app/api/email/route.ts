import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Fonction pour récupérer l'email de l'admin depuis l'API
const getAdminEmail = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAdmin`);
    const data = await res.json();
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
    console.log("Received a POST request");

    // Parse le corps de la requête (le formulaire)
    const body = await request.json();
    const { firstname, lastname, email, phone, message } = body;

    // Affiche les données pour débogage
    console.log("Body server:", body);

    // Récupérer l'email de l'admin depuis l'API
    const adminEmail = await getAdminEmail();

    // Envoi de l'email via Resend
    const emailResult = await resend.emails.send({
      from: "contact@le-plessis-aux-lys.fr",
      // `${firstname} ${lastname} <leplessis@resend.dev>`,
      // to: process.env.TO_EMAIL ?? "marionbaston84@gmail.com",
      to: adminEmail,
      subject: "Message envoyé depuis Le Plessis Aux Lys",
      react: EmailTemplate({ firstname, lastname, email, phone, message }),
    });

    console.log("Email sent result:", emailResult);

    return NextResponse.json({ message: "Email successfully sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

