"use client";

import UserLoginForm from "@/app/_components/UserLoginForm";
import { Button } from "@/components/ui/button";
import { Milestone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleClickHome = () => {
    if (router) {
      router.push("/");
    }
  };
  return (
    <div>
      <Button
        type="button"
        onClick={handleClickHome}
        className=" border w-[12rem] mt-10 rounded-full ml-6 gap-2  bg-slate-100 hover:bg-slate-200 text-text_color text-md lg:text-md"
      >
        <Milestone size={20} className="transform scale-x-[-1] " /> Retour à
        l'accueil
      </Button>
      <UserLoginForm />
    </div>
  );
}

