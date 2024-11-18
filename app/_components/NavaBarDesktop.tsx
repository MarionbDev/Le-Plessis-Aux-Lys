"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./navDesktop.module.css";

export default function NavBarDesktop() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const router = useRouter();
  const currentRoute = usePathname();

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // const handleButtonClick = () => {
  //   router.push("/login");
  // };

  return (
    <div className="">
      <div className=" font-text text-text_color flex gap-2 xl:gap-6 px-10  border-none ">
        <Link
          href={"/"}
          // onClick={() => router.push("/")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Accueil
          <span className={styles.underline}></span>
        </Link>

        <div
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
          className={`flex flex-col  ${currentRoute === "/gites" ? styles.activeLink : styles.nonActiveLink}`}
        >
          <div className="text-xl relative z-50 lg:text-[1rem]">Gîtes</div>
          <span className={styles.underline}></span>

          <div
            className={`${activeIndex === 0 ? "block" : "hidden"} text-start h-[15rem] w-24  flex flex-col absolute top-[5px] z-0 pt-16 rounded-sm`}
          >
            <div className="flex flex-col bg-[#fafafc]  w-72  ">
              <div className="px-2 text-xl lg:text-[0.9rem]">
                Tous les gîtes
              </div>
              <Link
                href={"/gites/le-logis-de-la-petite-ourse"}
                // onClick={() => router.push("/gite")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
              >
                Le Logis de la petite Ourse
              </Link>
              <Link
                href={"/gites/le-logis-de-la-grande-ourse"}
                // onClick={() => router.push("/gite")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
              >
                Le Logis de la grande Ourse
              </Link>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          className={`flex flex-col  ${currentRoute === "/chambres" ? styles.activeLink : styles.nonActiveLink}`}
        >
          <div className="text-xl relative z-50 lg:text-[1rem]">Chambres</div>
          <span className={styles.underline}></span>

          <div
            className={`${activeIndex === 1 ? "block" : "hidden"} text-start h-[15rem] w-24  flex flex-col absolute top-[5px] z-0 pt-16 rounded-sm`}
          >
            <div className="flex flex-col bg-[#fafafc] w-60  ">
              <div className="px-2 text-xl lg:text-[0.9rem]">
                Toutes les chambres
              </div>
              <Link
                href={"/chambres/orion"}
                // onClick={() => router.push("/chambres/1")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
              >
                Chambre Orion
              </Link>
              <Link
                href={"/chambres/cassiopee"}
                // onClick={() => router.push("/chambres/2")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem]"
              >
                Chambre Cassiopée
              </Link>
              <Link
                href={"/chambres/andromede"}
                // onClick={() => router.push("/chambres/3")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] rounded-sm"
              >
                Chambre Andromède
              </Link>
              <Link
                href={"/chambres/suite-familiale-pegase"}
                // onClick={() => router.push("/chambres/3")}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] rounded-sm"
              >
                Suite familiale Pégase
              </Link>
            </div>
          </div>
        </div>
        <Link
          href={"/jardin"}
          // onClick={() => router.push("/jardin")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/jardin" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Parc & Jardin
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/activites"}
          // onClick={() => router.push("/activites")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/activites" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Activités
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/nous-contacter"}
          // onClick={() => router.push("/nous-contacter")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/nous-contacter" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Nous contacter
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/login"}
          aria-label="Lien vers l'espace de connexion administrateur "
          className=" flex items-center text-xl lg:text-[1rem] opacity-50 hover:opacity-100 "
        >
          <LogIn size={24} color="#bbbb57" />
        </Link>
      </div>
    </div>
  );
}

