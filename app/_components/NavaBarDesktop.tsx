"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navDesktop.module.css";

export default function NavBarDesktop() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const currentRoute = usePathname();

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div>
      <div className=" font-text text-text_color flex items-center gap-2 xl:gap-6 lg:px-10  border-none ">
        <Link
          href={"/"}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Accueil
          <span className={styles.underline}></span>
        </Link>

        <div
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
          className={`flex flex-col  ${currentRoute === "/gites-vendee" ? styles.activeLink : styles.nonActiveLink}`}
        >
          <button className="text-xl relative z-50 lg:text-[1rem]">
            Gîtes
          </button>
          <span className={styles.underline}></span>

          <div
            className={`${activeIndex === 0 ? "block" : "hidden"} text-start h-[15rem] w-24  flex flex-col absolute top-[5px] z-0 pt-16 rounded-sm`}
          >
            <div className="flex flex-col bg-[#fafafc]  w-72  ">
              <p className="px-2 text-xl lg:text-[0.9rem]">Tous les gîtes</p>
              <Link
                href={"/gites-vendee/le-logis-de-la-petite-ourse"}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
              >
                Le Logis de la petite Ourse
              </Link>
              <Link
                href={"/gites-vendee/le-logis-de-la-grande-ourse"}
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
          className={`flex flex-col  ${currentRoute === "/chambres-dhotes-vendee" ? styles.activeLink : styles.nonActiveLink}`}
        >
          <button className="text-xl relative z-50 lg:text-[1rem]">
            Chambres
          </button>
          <span className={styles.underline}></span>

          <div
            className={`${activeIndex === 1 ? "block" : "hidden"} text-start h-[15rem] w-24  flex flex-col absolute top-[5px] z-0 pt-16 rounded-sm`}
          >
            <div className="flex flex-col bg-[#fafafc] w-60  ">
              <p className="px-2 text-xl lg:text-[0.9rem] ">
                Toutes les chambres
              </p>
              <Link
                href={"/chambres-dhotes-vendee/orion"}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
              >
                Chambre Orion
              </Link>
              <Link
                href={"/chambres-dhotes-vendee/cassiopee"}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem]"
              >
                Chambre Cassiopée
              </Link>
              <Link
                href={"/chambres-dhotes-vendee/andromede"}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] rounded-sm"
              >
                Chambre Andromède
              </Link>
              <Link
                href={"/chambres-dhotes-vendee/suite-familiale-pegase"}
                className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] rounded-sm"
              >
                Suite familiale Pégase
              </Link>
            </div>
          </div>
        </div>
        <Link
          href={"/jardin"}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/jardin" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Parc & Jardin
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/activites"}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/activites" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Activités
          <span className={styles.underline}></span>
        </Link>
        <div className="group relative overflow-hidden rounded-full px-4 h-14 xl:h-9 flex justify-center items-center bg-yellow transition-all duration-500 text-white hover:text-text_color ">
          <div className="absolute inset-0 bg-[#e2e293] w-0 group-hover:w-full transition-all duration-500 "></div>
          <Link
            href={"/nous-contacter"}
            className={`relative z-10 text-xl lg:text-[1rem] flex flex-col   ${
              currentRoute === "/nous-contacter"
                ? styles.activeLink
                : styles.nonActiveLink
            }`}
          >
            Nous contacter
            <span className={styles.noneUnderline}></span>
          </Link>
        </div>

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

