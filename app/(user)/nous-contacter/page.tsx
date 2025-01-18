import anes from "@/public/home/anes.webp";
import beach from "@/public/home/beach4.webp";
import nature from "@/public/home/nature.webp";
import { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./_components/Contact";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Contactez-nous - Le Plessis aux Lys",
  description:
    "Vous avez des questions ou des demandes spécifiques ? Contactez-nous pour obtenir plus d'informations sur votre séjour au Plessis aux Lys.",
  keywords: [
    "contact gîte Vendée",
    "réservation gîte Vendée",
    "séjour Vendée",
    "contact location gîte",
    "contact Le Plessis aux Lys",
  ],
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Contactez Le Plessis aux Lys",
    description:
      "Pour toute information ou question, contactez Le Plessis aux Lys et nous serons ravis de vous répondre.",
    url: "https://le-plessis-aux-lys.fr/nous-contacter",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Le Plessis aux Lys",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/home/beach4.webpg",
        width: 1200,
        height: 630,
        alt: "Contactez Le Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez Le Plessis aux Lys",
    description:
      "Pour toute information ou demande, contactez Le Plessis aux Lys pour en savoir plus sur votre séjour.",
    images: "https://le-plessis-aux-lys.fr/home/beach4.webpg",
    site: "@le-plessis-aux-lys",
  },
};

export default function ContactPage() {
  return (
    <>
      <div className=" min-h-screen font-text flex flex-col lg:flex-row gap-16 lg:gap-4 lg:mx-4 md:justify-around items-center mt-12 mb-32  xl:mb-0">
        <div className="flex flex-col  lg:w-[33rem] xl:w-[40rem] md:gap-8 lg:gap-20 xl:gap-10 md:mt-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 my-12 md:mt-0 lg:-mt-10 ">
            <span className=" hidden lg:flex justify-center w-[12rem] border-t-2  border-separator"></span>
            <p className=" font-semibold text-text_color text-center md:text-xl uppercase md:w-[28rem]  ">
              COntactez-nous
            </p>
            <span className="flex justify-center w-[12rem] border-t-2  border-separator"></span>
          </div>

          <div className="flex justify-center items-center sm:hidden"></div>
          <div className=" flex justify-center flex-wrap mx-7 sm:mx-0  gap-3  ">
            <Image
              src={beach}
              width={300}
              height={200}
              alt="image"
              className="  shadow-basic rounded-sm w-[9rem] sm:w-[18rem] md:w-[22rem]  lg:w-[16rem] xl:w-[18rem] h-auto "
            />
            <Image
              src={nature}
              width={300}
              height={169}
              alt="image"
              className=" shadow-basic rounded-sm  w-[9rem] sm:w-[18rem]  md:w-[22rem]   lg:w-[16rem] xl:w-[18rem] h-auto "
            />
            <Image
              src={anes}
              width={200}
              height={101}
              alt="image"
              className=" shadow-basic rounded-sm  w-[9rem] sm:w-[18rem]  md:w-[22rem]   lg:w-[16rem] xl:w-[18rem] h-auto "
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

