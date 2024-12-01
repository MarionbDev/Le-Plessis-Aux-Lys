import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" font-text text-text_color flex flex-col text-[0.9rem] p-4  bg-[#bbbb57]/30 rounded-t-3xl md:rounded-none w-full ">
      <div className="flex flex-col items-center gap-4  w-full">
        {/* <p>Création : Marion Baston </p> */}
        <Link href={"/mentions-legales"} className="hover:text-[#bbbb57]">
          Mentions Légales
        </Link>{" "}
        <Link
          href={"/politique-confidentialite"}
          className="hover:text-[#bbbb57]"
        >
          Politique de Confidentialité
        </Link>
        <Link href={"/nous-contacter"} className="hover:text-[#bbbb57]">
          Contact
        </Link>
        @Copyright {currentYear}
        {/* <h4>Plan du site</h4> */}
      </div>
    </div>
  );
}

