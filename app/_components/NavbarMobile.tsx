"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { LogIn, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavBarMobile() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/login");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-10">
          <Menu size={42} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-[#fafafc] mr-1 ">
          <DropdownMenuLabel className="flex justify-center my-2 text-base">
            Bienvenue
          </DropdownMenuLabel>
          <DropdownMenuSeparator className=" border-[1px] " />
          <Menubar className=" flex flex-col h-82 gap-6 px-6   border-none  ">
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/")}
                className="text-base"
              >
                Accueil
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/gîte")}
                className="text-base"
              >
                Gîte
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <div
                  onClick={() => router.push("/chambres")}
                  className="text-base"
                >
                  Chambres
                </div>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/a-visiter")}
                className="text-base"
              >
                A visiter
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/nous-contacter")}
                className="text-base"
              >
                Nous contacter
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={handleButtonClick}
                type="button"
                className=" flex gap-2 text-base"
              >
                <LogIn className=" text-slate-700" /> Se connecter
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
