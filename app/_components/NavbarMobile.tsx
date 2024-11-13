"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Importer useState

export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false); // Gérer l'état ouvert/fermé du menu
  const router = useRouter();

  // Fonction pour naviguer et fermer le menu
  const handleNavigation = (path: string) => {
    setIsOpen(false); // Fermer le menu
    router.push(path); // Naviguer vers la page
  };

  const handleButtonClick = () => {
    setIsOpen(false); // Fermer le menu
    router.push("/login"); // Naviguer vers la page de connexion
  };

  return (
    <div className="navbar-mobile flex justify-start">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        {" "}
        {/* Utilisation de onOpenChange */}
        <DropdownMenuTrigger
          aria-label="Menu de navigation"
          className="ml-6 mt-6"
        >
          <Menu className="w-11 h-11 text-white p-2 rounded-full bg-[#64641fd8]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#fafafc] ml-4 w-64">
          <DropdownMenuLabel className="flex justify-center my-2 text-xl">
            Bienvenue
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-b-[1px]" />
          <Menubar className="flex flex-col items-start h-82 gap-6 px-6 border-none">
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/")} // Fermer le menu après la navigation
                className="text-[1.2rem]"
              >
                Accueil
              </MenubarTrigger>
            </MenubarMenu>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-[1.2rem]">
                Gites
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-[#fafafc]">
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/gites/le-logis-de-la-petite-ourse"
                    className="text-[1.2rem]"
                    onClick={() =>
                      handleNavigation("/gites/le-logis-de-la-petite-ourse")
                    } // Fermer le menu
                  >
                    Le Logis de la petite Ourse
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/gites/le-logis-de-la-grande-ourse"
                    className="text-[1.2rem]"
                    onClick={() =>
                      handleNavigation("/gites/le-logis-de-la-grande-ourse")
                    } // Fermer le menu
                  >
                    Le Logis de la grande Ourse
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-[1.2rem]">
                Chambres
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-[#fafafc]">
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/chambres/orion"
                    className="text-[1.2rem]"
                    onClick={() => handleNavigation("/chambres/orion")}
                  >
                    Chambre Orion
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/chambres/cassiopee"
                    className="text-[1.2rem]"
                    onClick={() => handleNavigation("/chambres/cassiopee")}
                  >
                    Chambre Cassiopée
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/chambres/andromede"
                    className="text-[1.2rem]"
                    onClick={() => handleNavigation("/chambres/andromede")}
                  >
                    Chambre Andromède
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md">
                  <Link
                    href="/chambres/suite-familiale-pegase"
                    className="text-[1.2rem]"
                    onClick={() =>
                      handleNavigation("/chambres/suite-familiale-pegase")
                    }
                  >
                    Suite familiale Pégase
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/jardin")}
                className="text-[1.2rem]"
              >
                Parc & Jardin
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/activites")}
                className="text-[1.2rem]"
              >
                Activités
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/nous-contacter")}
                className="text-[1.2rem]"
              >
                Nous contacter
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={handleButtonClick} // Fermer le menu et naviguer vers la page de connexion
                type="button"
                className="flex gap-2 text-[1.2rem] italic opacity-50 hover:opacity-100"
              >
                <LogIn className="text-slate-800/90" /> Se connecter
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
