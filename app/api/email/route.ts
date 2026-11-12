import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import { withCorsHeaders } from "@/lib/cors";
import supabase from "@/lib/database";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Détecte un lien dans le message (http://, www., ou domaine suivi d'un chemin)
const LINK_REGEX = /(https?:\/\/|www\.|\b[a-z0-9-]+\.[a-z]{2,}\/)/i;

// Fonction POST pour gérer l'envoi d'email
export const POST = async (request: NextRequest) => {
  try {
    // Parse les données du formulaire
    const body = await request.json();
    const { firstname, lastname, email, phone, message, company } = body;

    // 🛡️ Anti-spam 1 : honeypot → réponse "OK" silencieuse, rien n'est envoyé
    // (placé avant tout le reste : inutile d'interroger Supabase pour un robot)
    if (company && String(company).trim() !== "") {
      return withCorsHeaders(
        NextResponse.json({ message: "Email successfully sent!" }),
      );
    }

    // 🛡️ Anti-spam 2 : pas de lien dans le message
    // (réponse explicite : un vrai visiteur peut corriger son message)
    if (LINK_REGEX.test(String(message || ""))) {
      return withCorsHeaders(
        NextResponse.json(
          {
            error:
              "Pour des raisons de sécurité, les liens ne sont pas acceptés dans le message.",
          },
          { status: 400 },
        ),
      );
    }

    // 🛠️ Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return withCorsHeaders(
        NextResponse.json({ error: "Email invalide" }, { status: 400 }),
      );
    }

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
    const emailResult = await resend.emails.send({
      from: '"le-plessis-aux-lys" <noreply@le-plessis-aux-lys.fr>',
      to: adminEmail,
      subject: "Vous avez reçu un nouveau message",
      react: EmailTemplate({ firstname, lastname, email, phone, message }),
    });

    // ✅ Vérifie que Resend a vraiment accepté l'envoi
    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return withCorsHeaders(
        NextResponse.json(
          { error: "Erreur lors de l'envoi de l'email." },
          { status: 500 },
        ),
      );
    }

    // Revalidation après avoir mis à jour les données de l'admin
    revalidatePath("/api/getAdmin");

    return withCorsHeaders(
      NextResponse.json({
        message: "Email successfully sent!",
        emailResult,
      }),
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return withCorsHeaders(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 }),
    );
  }
};
