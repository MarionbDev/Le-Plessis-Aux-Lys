// import EmailTemplate from "@/app/_components/contact/EmailTemplate";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { resend } from "../../../lib/resend";

// // Send email
// export const POST = async (request: NextRequest) => {
//   try {
//     console.log("Received a POST request");

//     const body = await request.json();

//     const { firstname, lastname, email, message } = body;

//     console.log("body server", body);

//     // const toEmail = process.env.TO_EMAIL;

//     resend.emails.send({
//       from: `${firstname} ${lastname} <leplessis@resend.dev>`,
//       to: ["marionbaston84@gmail.com"],
//       // changer avec les données avec celles du client dans la database
//       subject: "Message envoyé depuis Le Plessis Aux Lys ",
//       react: EmailTemplate({ firstname, lastname, email, message }),
//     });

//     // console.log("Email send result:", emailResult);

//     return NextResponse.json({ message: "email successfull sent!" });
//   } catch (error) {
//     console.log("error", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// };

import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Fonction POST pour gérer l'envoi d'email
export const POST = async (request: NextRequest) => {
  try {
    console.log("Received a POST request");

    // Parse le corps de la requête (le formulaire)
    const body = await request.json();
    const { firstname, lastname, email, phone, message } = body;

    // Affiche les données pour débogage
    console.log("Body server:", body);

    // Envoi de l'email via Resend
    const emailResult = await resend.emails.send({
      from: "contact@le-plessis-aux-lys.fr",
      // `${firstname} ${lastname} <leplessis@resend.dev>`,
      to: process.env.TO_EMAIL ?? "marionbaston84@gmail.com", // Email destinataire
      subject: "Message envoyé depuis Le Plessis Aux Lys", // Sujet de l'email
      react: EmailTemplate({ firstname, lastname, email, phone, message }), // Contenu HTML généré
    });

    // Affiche le résultat de l'envoi d'email
    console.log("Email sent result:", emailResult);

    // Réponse indiquant que l'email a été envoyé avec succès
    return NextResponse.json({ message: "Email successfully sent!" });
  } catch (error) {
    // Gère les erreurs et les logue
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

