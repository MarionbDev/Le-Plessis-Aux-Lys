import Image from "next/image";
import Link from "next/link";
import not_found from "../public/404_not-found.jpg";

export default function Custom404() {
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      {/* <Image src={not_found} width={640} height={320} /> */}
      <Image src={not_found} width={460} height={320} alt="page non trouvée" />
      <h1 className=" text-[20px] mb-4 text-center">
        Oops!! La page que vous cherchez n'existe plus ou a été déplacée.
        <br /> Mais on en a plein d'autres à vous montrer !{" "}
      </h1>

      <div>
        <Link href="/">
          <p className=" underline text-[20px] text-purple">
            {" "}
            Retour sur la page d'accueil
          </p>
        </Link>
      </div>
    </div>
  );
}

