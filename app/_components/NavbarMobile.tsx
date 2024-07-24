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
    <div className="navbar-mobile flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-10 mt-6">
          <Menu className=" w-11 h-11 text-white p-2 rounded-full bg-[#64641fd8] " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-[#fafafc] mr-4 ">
          <DropdownMenuLabel className="flex justify-center my-2 text-md ">
            Bienvenue
          </DropdownMenuLabel>
          <DropdownMenuSeparator className=" border-b-[1px] " />
          <Menubar className=" flex flex-col h-82 gap-6 px-6   border-none  ">
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/")}
                className="text-[0.9rem]"
              >
                Accueil
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/user/gite")}
                className="text-[0.9rem]"
              >
                Gîte
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <div
                  onClick={() => router.push("/user/chambres")}
                  className="text-[0.9rem]"
                >
                  Chambres
                </div>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/user/activites")}
                className="text-[0.9rem]"
              >
                A visiter
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => router.push("/user/nous-contacter")}
                className="text-[0.9rem]"
              >
                Nous contacter
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={handleButtonClick}
                type="button"
                className=" flex  gap-2 text-[0.9rem] italic opacity-50 hover:opacity-100 "
              >
                <LogIn className=" text-slate-800/90 " /> Se connecter
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
