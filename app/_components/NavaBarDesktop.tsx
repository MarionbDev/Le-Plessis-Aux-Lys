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
      <Menubar className=" flex  gap-6 px-10  border-none  ">
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push("/")} className="text-xl">
            Accueil
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/gîte")}
            className="text-xl"
          >
            Gîte
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <div onClick={() => router.push("/chambres")} className="text-xl">
              Chambres
            </div>
          </MenubarTrigger>
          <MenubarContent className=" bg-[#fafafc]">
            <MenubarItem
              onClick={() => router.push("/chambre-1")}
              className=" hover:bg-bg_menu/40 text-xl"
            >
              Chambre 1
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-2")}
              className=" hover:bg-bg_menu/40 text-xl"
            >
              Chambre 2
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/chambre-3")}
              className=" hover:bg-bg_menu/40 text-xl"
            >
              Chambre 3
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/a-visiter")}
            className="text-xl"
          >
            A visiter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => router.push("/nous-contacter")}
            className="text-xl "
          >
            Nous contacter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <button
            onClick={handleButtonClick}
            type="button"
            className=" flex gap-2 text-xl"
          >
            <LogIn size={32} />
          </button>
        </MenubarMenu>
      </Menubar>
    </>
  );
}

