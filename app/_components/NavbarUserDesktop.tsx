"use client";

import useScrollListener from "@/hooks/useScrollListener";
import { useEffect, useState } from "react";
import NavBarDesktop from "./NavaBarDesktop";

export default function NavbarUser() {
  const [navClassList, setNavClassList] = useState<string[]>([]);
  const scroll = useScrollListener();

  // mise à jour de classList sur le scroll de la nav
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 300 && scroll.y - scroll.lastY > 0) {
      _classList.push(" translate-y-[-100%] "); // cache la barre de navigation avec transition
    }

    // la classe de box-shadow uniquement lorsque vous n'êtes pas tout en haut de la page
    if (scroll.y > 0) {
      _classList.push("shadow-navbar");
    }

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  // useEffect pour gérer le cas où vous êtes trop bas dans la page
  useEffect(() => {
    if (scroll.y === 0) {
      setNavClassList([""]); // Réinitialise les styles lorsque haut de la page
    }
  }, [scroll.y]);

  return (
    <nav
      className={`hidden z-[999] bg-[#fdfdfd]   sticky top-0 lg:flex items-center justify-between h-20 transform transition-transform duration-500 ${navClassList.join(
        " ",
      )} `}
    >
      <div className="flex flex-col justify-center gap-4 pt-6">
        <h1 className="font-title-home text-title_color italic font-extralight  ml-4 md:ml-10   text-2xl md:text-[3rem] tracking-[3px]  ">
          Le Plessis Aux Lys
        </h1>
        <span className="flex justify-center w-[7rem] md:ml-10  border-t-2  border-separator"></span>
      </div>

      <NavBarDesktop />
    </nav>
  );
}

