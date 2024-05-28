"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogIn } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navDesktop.module.css";

export default function NavBarDesktop() {
  const router = useRouter();

  const currentRoute = usePathname();

  const handleButtonClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Menubar className=" font-text text-text_color flex  gap-2 px-10  border-none  ">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/")}
            className={`text-xl lg:text-[1rem] ${currentRoute === "/" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Accueil
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/gîte")}
            className={`text-xl lg:text-[1rem] ${currentRoute === "/" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Gîte
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-xl lg:text-[1rem]">
            Chambres
          </MenubarTrigger>
          <MenubarContent className=" bg-[#fafafc]">
            <MenubarItem
              onClick={() => router.push("/les-chambres")}
              className=" hover:bg-subMenu text-xl lg:text-[0.9rem]"
            >
              Toutes les chambres
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-1")}
              className=" hover:bg-subMenu text-xl lg:text-[0.9rem] "
            >
              Chambre 1
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-2")}
              className=" hover:bg-subMenu text-xl lg:text-[0.9rem]"
            >
              Chambre 2
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-3")}
              className=" hover:bg-subMenu text-xl lg:text-[0.9rem]"
            >
              Chambre 3
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/tarifs")}
            className="text-xl lg:text-[1rem]"
          >
            Tarifs
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/a-visiter")}
            className="text-xl lg:text-[1rem]"
          >
            A visiter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/nous-contacter")}
            className="text-xl lg:text-[1rem] "
          >
            Nous contacter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <button
            onClick={handleButtonClick}
            type="button"
            className=" flex gap-2 text-xl lg:text-[1rem] opacity-50 hover:opacity-100 "
          >
            <LogIn size={24} />
          </button>
        </MenubarMenu>
      </Menubar>
    </>
  );
}

