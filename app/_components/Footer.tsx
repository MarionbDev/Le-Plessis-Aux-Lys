import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" font-text text-text_color flex flex-col gap-6 text-[0.9rem] py-12  bg-[#f8f5f0] rounded-t-3xl md:rounded-none w-full ">
      <div className="flex flex-col gap-2 pl-6">
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
        <p>29, Rue de la Petite Chapelle, La Chapelle-aux-Lys, 85120 Terval</p>
        <Link href={"/nous-contacter"} className="flex ">
          <Mail size={20} color="#bbbb57" />
          &nbsp; Contactez-nous
        </Link>
      </div>
      <span className="flex justify-center mx-4 border-t-2  border-[#e4e1de] "></span>
      <div className="flex flex-col md:flex-row  items-center gap-1 mx-6">
        <p>@{currentYear} Le Plessis aux Lys.</p>
        <p>Tous droits réservés.</p>
      </div>
    </div>
  );
}

