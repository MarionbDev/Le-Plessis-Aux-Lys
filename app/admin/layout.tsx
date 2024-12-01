"use client";

import useSession from "@/hooks/useSession";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import NavbarDesktopAdmin from "./_components/NavBarDesktopAdmin";
import NavBarMobileAdmin from "./_components/NavBarMobileAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, error, loading } = useSession();
  const router = useRouter();

  // console.log("user :", user);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader size={50} className=" animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>Une erreur s'est produite : {error.message}</p>;
  }

  return (
    <div className=" h-screen font-text 0 ">
      <div className="title-nav-mobile-admin flex justify-center">
        <h1 className="font-title-home absolute top-20  text-title_color italic font-extralight text-3xl sm:text-4xl  tracking-[3px]  ">
          Le Plessis Aux Lys
        </h1>
      </div>
      <NavbarDesktopAdmin />
      <NavBarMobileAdmin />
      <main>{children}</main>
    </div>
  );
}

