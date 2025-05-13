import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" font-text text-text_color flex flex-col gap-6 text-[0.9rem] py-12  bg-[#f8f5f0] rounded-t-3xl md:rounded-none w-full ">
      <div className="flex flex-col gap-2 pl-6 ">
        <p className="mb-2 text-[1rem] font-semibold">Informations Légales</p>
        <Link href={"/mentions-legales"} className="hover:text-[#bbbb57]">
          Mentions Légales
        </Link>{" "}
        <Link
          href={"/politique-confidentialite"}
          className="hover:text-[#bbbb57]"
        >
          Politique de Confidentialité
        </Link>
      </div>
      <div className="flex flex-col gap-2 pl-6">
        <p className="mb-2 text-[1rem] font-semibold">Contact</p>
        <div className="flex flex-col md:flex-row ">
          <span className="flex">
            <MapPin size={23} color="#bbbb57" />
            &nbsp; 29, Rue de la Petite Chapelle,
          </span>
          <span className="pl-8 md:pl-1">
            {" "}
            La Chapelle-aux-Lys, 85120 Terval
          </span>
        </div>

        <Link href={"/nous-contacter"} className="flex hover:text-[#bbbb57] ">
          <Mail size={20} color="#bbbb57" />
          &nbsp; Contactez-nous
        </Link>

        <Link href="tel:0689666711" className="flex hover:text-[#bbbb57]">
          <Phone size={20} color="#bbbb57" /> &nbsp; 06 89 66 67 11
        </Link>
      </div>

      <div className="bg-[#f4f1ec] border border-[#e0dedb] rounded-xl p-4 mx-6 flex items-start gap-3 max-w-xl shadow-sm mb-8 ">
        <MessageCircle color="#bbbb57" className="mt-1 w-14 md:w-10" />
        <p className="text-[0.95rem] leading-snug">
          Vous pouvez nous laisser un message vocal avec vos coordonnées, nous
          vous rappellerons avec plaisir.
        </p>
      </div>
      <span className="flex justify-center mx-4 border-t-2  border-[#e4e1de] "></span>
      <div className="flex flex-col md:flex-row  items-center gap-1 mx-6">
        <p>@{currentYear} Le Plessis aux Lys.</p>
        <p>Tous droits réservés.</p>
      </div>
    </div>
  );
}

