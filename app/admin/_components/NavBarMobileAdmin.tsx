"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { logout } from "@/services/auth.services";
import { LogIn, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Importer useState
import { toast } from "sonner";

export default function NavBarMobileAdmin() {
  const [isOpen, setIsOpen] = useState(false); // Gérer l'état ouvert/fermé du menu
  const router = useRouter();

  // Fonction pour naviguer et fermer le menu
  const handleNavigation = (path: string) => {
    setIsOpen(false); // Fermer le menu
    router.push(path); // Naviguer vers la page
  };

  const handleLogOut = async () => {
    await logout();
    toast.loading("Déconnexion en cours ...");
    setTimeout(() => {
      router.push("/");
    }, 2000);
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
          <DropdownMenuLabel className="flex justify-center my-2 text-lg">
            Bienvenue
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-b-[1px]" />
          <Menubar className="flex flex-col items-start h-82 gap-6 px-6 border-none">
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin")} // Fermer le menu après la navigation
                className="text-[1rem]"
              >
                Tableau de bord
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/tarifs")}
                className="text-[1rem]"
              >
                Tarifs
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/reservations")}
                className="text-[1rem]"
              >
                Réservations
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/details")}
                className="text-[1rem]"
              >
                Détails
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/photos")}
                className="text-[1rem]"
              >
                Photos
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/activites")}
                className="text-[1rem]"
              >
                Activités
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={() => handleNavigation("/admin/parametres")}
                className="text-[1rem]"
              >
                Paramètres
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                onClick={handleLogOut} // Fermer le menu et naviguer vers la page de connexion
                type="button"
                className="flex gap-2 text-[1rem] italic opacity-50 hover:opacity-100"
              >
                <LogIn className="text-slate-800/90" /> Déconnexion
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

