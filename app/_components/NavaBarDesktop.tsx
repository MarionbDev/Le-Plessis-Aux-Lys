"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavBarDesktop() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Menubar className=" flex  gap-6 px-10  border-none ">
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push("/")}>
            Accueil
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push("/gîte")}>
            Gîte
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <div onClick={() => router.push("/chambres")}>Chambres</div>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => router.push("/chambre-1")}
              className=" hover:bg-slate-100"
            >
              Chambre 1
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-2")}
              className=" hover:bg-slate-100"
            >
              Chambre 2
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-3")}
              className=" hover:bg-slate-100"
            >
              Chambre 3
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push("/a-visiter")}>
            A visiter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push("/nous-contacter")}>
            Nous contacter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <button
            onClick={handleButtonClick}
            type="button"
            className=" flex gap-2"
          >
            <LogIn className=" text-slate-700" /> Se connecter
          </button>
        </MenubarMenu>
      </Menubar>
    </>
  );
}

