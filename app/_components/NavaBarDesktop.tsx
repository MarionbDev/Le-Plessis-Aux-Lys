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

  const handleButtonClick = () => {
    router.push("/login");
  };
  return (
    <>
      <div className=" font-text text-text_color flex gap-4 px-10  border-none ">
        <Link
          href={"/"}
          onClick={() => router.push("/")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Accueil
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/gite"}
          onClick={() => router.push("/gite")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/gite" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Gîte
          <span className={styles.underline}></span>
        </Link>

        <div
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
          className={`flex flex-col ${currentRoute === "/chambres" ? styles.activeLink : styles.nonActiveLink}`}
        >
          <div className="text-xl lg:text-[1rem]">Chambres</div>
          <span className={styles.underline}></span>

          <div
            className={`${activeIndex === 0 ? "block" : "hidden"} text-start  bg-[#fafafc] flex flex-col absolute top-[69px] w-52 rounded-sm`}
          >
            <Link
              href={"/toutes-les-chambres"}
              onClick={() => router.push("/les-chambres")}
              className="   hover:bg-subMenu text-xl px-2 lg:text-[0.9rem] rounded-sm"
            >
              Toutes les chambres
            </Link>
            <Link
              href={"/chambre-1"}
              onClick={() => router.push("/chambre-1")}
              className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] "
            >
              Chambre 1
            </Link>
            <Link
              href={"/chambre-2"}
              onClick={() => router.push("/chambre-2")}
              className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem]"
            >
              Chambre 2
            </Link>
            <Link
              href={"/chambre-3"}
              onClick={() => router.push("/chambre-3")}
              className=" hover:bg-subMenu px-2 text-xl lg:text-[0.9rem] rounded-sm"
            >
              Chambre 3
            </Link>
          </div>
        </div>
        <Link
          href={"/tarifs"}
          onClick={() => router.push("/tarifs")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/tarifs" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Tarifs
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/a-visiter"}
          onClick={() => router.push("/a-visiter")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/a-visiter" ? styles.activeLink : styles.nonActiveLink}`}
        >
          A visiter
          <span className={styles.underline}></span>
        </Link>

        <Link
          href={"/nous-contacter"}
          onClick={() => router.push("/nous-contacter")}
          className={`text-xl lg:text-[1rem] flex flex-col ${currentRoute === "/nous-contacter" ? styles.activeLink : styles.nonActiveLink}`}
        >
          Nous contacter
          <span className={styles.underline}></span>
        </Link>

        <button
          onClick={handleButtonClick}
          type="button"
          className=" flex items-center gap-2 text-xl lg:text-[1rem] opacity-50 hover:opacity-100 "
        >
          <LogIn size={24} />
        </button>
      </div>
    </>
  );
}

