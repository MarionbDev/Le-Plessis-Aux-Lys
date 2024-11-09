import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="  mb-4 font-text flex flex-col  text-base lg:text-sm p-4 ">
      <div className=" flex flex-col items-center md:flex-row md:justify-center  gap-4">
        <Link href={"/nous-contacter"}>
          <h4>Contact</h4>
        </Link>
        {/* <h4>Plan du site</h4> */}
      </div>
      <div className="flex flex-col items-center  md:flex-row md:justify-center w-full pt-4 gap-2 xl:gap-4">
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

