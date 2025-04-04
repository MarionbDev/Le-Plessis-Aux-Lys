"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ChevronDown, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Importer useState

export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleButtonClick = () => {
    setIsOpen(false);
    router.push("/login");
  };

  const toggleSubMenu = (menu: string) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  return (
    <div className="navbar-mobile flex justify-end bg-[#fdfdfd]  ">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          aria-label="Menu de navigation"
          className="mr-6 my-3 "
        >
          <Menu className="w-11 h-11 text-white p-2 rounded-full bg-yellow" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={0}
          className="border-none shadow-none bg-[#fdfdfd] w-[100vw] text-text_color h-screen  "
        >
          <DropdownMenuLabel className="flex  justify-center mt-4 mb-6 text-lg ">
            <div className="flex flex-col items-center">
              <p>Bienvenue </p>
              <span className="underline-menu  "></span>
            </div>
          </DropdownMenuLabel>

          <Menubar className="flex flex-col items-center gap-6 border-none  h-full overflow-y-auto pb-52">
            {/* <div className="min-h-screen "> */}
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/")}
                className="text-[1rem]"
              >
                Accueil
              </MenubarTrigger>
            </MenubarMenu>

            {/* Sous-menu Gites */}
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => toggleSubMenu("gites")}
                className="text-[1rem]   "
              >
                Gites
                <ChevronDown
                  size={20}
                  color="#64641fd8"
                  className="ml-1 mt-1"
                />
              </MenubarTrigger>

              {activeSubMenu === "gites" && (
                <div className=" flex flex-col items-center -mt-6   ">
                  <DropdownMenuItem className="text-md">
                    <Link
                      href="/gites-vendee/le-logis-de-la-petite-ourse"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation(
                          "/gites-vendee/le-logis-de-la-petite-ourse",
                        )
                      }
                    >
                      Le Logis de la petite Ourse
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-md ">
                    <Link
                      href="/gites-vendee/le-logis-de-la-grande-ourse"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation(
                          "/gites-vendee/le-logis-de-la-grande-ourse",
                        )
                      }
                    >
                      Le Logis de la grande Ourse
                    </Link>
                  </DropdownMenuItem>
                </div>
              )}
            </MenubarMenu>
            {/* Sous-menu Chambres */}
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => toggleSubMenu("chambres")}
                className="text-[1rem] "
              >
                Chambres
                <ChevronDown
                  size={20}
                  color="#64641fd8"
                  className="ml-1 mt-1"
                />
              </MenubarTrigger>

              {activeSubMenu === "chambres" && (
                <div className=" flex flex-col items-center -mt-6   ">
                  <DropdownMenuItem className="text-md ">
                    <Link
                      href="/chambres-dhotes-vendee/orion"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation("/chambres-dhotes-vendee/orion")
                      }
                    >
                      Chambre Orion
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-md">
                    <Link
                      href="/chambres-dhotes-vendee/cassiopee"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation("/chambres-dhotes-vendee/cassiopee")
                      }
                    >
                      Chambre Cassiopée
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-md">
                    <Link
                      href="/chambres-dhotes-vendee/andromede"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation("/chambres-dhotes-vendee/andromede")
                      }
                    >
                      Chambre Andromède
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-md">
                    <Link
                      href="/chambres-dhotes-vendee/suite-familiale-pegase"
                      className="text-[1rem]"
                      onClick={() =>
                        handleNavigation(
                          "/chambres-dhotes-vendee/suite-familiale-pegase",
                        )
                      }
                    >
                      Suite familiale Pégase
                    </Link>
                  </DropdownMenuItem>
                </div>
              )}
            </MenubarMenu>
            {/* Autres menus */}
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/jardin")}
                className="text-[1rem]"
              >
                Parc & Jardin
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/activites")}
                className="text-[1rem]"
              >
                Activités
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/nous-contacter")}
                className="text-[1rem] text-white bg-yellow rounded-full px-6"
              >
                Nous contacter
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={handleButtonClick}
                type="button"
                className="flex gap-2 text-[1rem] italic opacity-50 hover:opacity-100"
              >
                <LogIn className="text-slate-800/90" /> Se connecter
              </MenubarTrigger>
            </MenubarMenu>
            {/* </div> */}
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
