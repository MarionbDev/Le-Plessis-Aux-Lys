import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" font-text text-text_color flex flex-col text-[0.8rem] p-4  bg-[#bbbb57]/30 rounded-t-3xl md:rounded-none w-full ">
      <div className="flex flex-col items-center gap-1   w-full">
        {/* <p>Création : Marion Baston </p> */}
        <Link href={"/mentions-legales"} className="hover:text-[#bbbb57]">
          <p>Mentions Légales </p>
        </Link>{" "}
        <Link href={"/nous-contacter"} className="hover:text-[#bbbb57]">
          <p>Politique de Confidentialité</p>
        </Link>
        <Link href={"/nous-contacter"} className="hover:text-[#bbbb57]">
          <p>Contact</p>
        </Link>
        <p>@Copyright {currentYear} </p>
        {/* <h4>Plan du site</h4> */}
      </div>
    </div>
  );
}

// importer logo pour contact + lien du mail
// lien mentions légales
// lien office tourisme

