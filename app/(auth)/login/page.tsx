"use client";

import UserLoginForm from "@/app/_components/UserLoginForm";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleClickHome = () => {
    if (router) {
      router.push("/");
    }
  };

  return (
    <div className="mx-8">
      <div className="flex flex-col items-center lg:items-start pl-8 mt-12 lg:mt-10">
        <div className="flex ">
          <div>
            <h1 className="font-title-home  text-title_color italic font-extralight text-3xl sm:text-4xl  tracking-[3px]  ">
              Le Plessis Aux Lys
            </h1>
            <span className="flex justify-center w-[6rem] md:w-[7rem]  border-t-2  border-separator"></span>
          </div>
        </div>
      </div>
      <div className=" flex justify-center lg:justify-start">
        <Button
          type="button"
          onClick={handleClickHome}
          className=" border mt-10 rounded-full hover:border-2 hover:border-yellow/50 md:ml-10 w-10 h-10 p-0"
        >
          <Undo2 size={22} color="#bbbb57" />
        </Button>
      </div>
      <UserLoginForm />
    </div>
  );
}

