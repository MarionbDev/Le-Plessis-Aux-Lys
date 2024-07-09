import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

// Send email
export const POST = async (request: NextRequest) => {
  try {
    console.log("Received a POST request");

    const body = await request.json();

    const { firstname, lastname, email, message } = body;

    console.log("body server", body);

    // const toEmail = process.env.TO_EMAIL;

    resend.emails.send({
      from: `${firstname} ${lastname} <onboarding@resend.dev>`,
      to: ["marionbaston84@gmail.com"],
      // changer avec les données avec celles du client dans la database
      subject: "Message envoyé depuis Le Plessis Aux Lys ",
      react: EmailTemplate({ firstname, lastname, email, message }),
    });

    // console.log("Email send result:", emailResult);

    return NextResponse.json({ message: "email successfull sent!" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

