import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="   font-text text-text_color flex flex-col text-base lg:text-sm p-4 bg-[#64641fd8]/20 rounded-t-3xl md:rounded-none ">
      <div className=" flex flex-col items-center md:flex-row md:justify-center mb-1 ">
        <Link href={"/nous-contacter"}>
          <p>Contact</p>
        </Link>
        {/* <h4>Plan du site</h4> */}
      </div>
      <div className="flex flex-col items-center  md:flex-row md:justify-center w-full  gap-1 xl:gap-4">
        <p>@Copyright {currentYear} </p>
        {/* <p>Création : Marion Baston </p> */}
        <Link href={"/mentions-legales"}>
          <p>Mentions Légales </p>
        </Link>
      </div>
    </div>
  );
}

// importer logo pour contact + lien du mail
// lien mentions légales

