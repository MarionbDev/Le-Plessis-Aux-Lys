"use client";

import useSession from "@/hooks/useSession";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import NavbarDesktopAdmin from "./_components/NavBarDesktopAdmin";
import NavBarMobileAdmin from "./_components/NavBarMobileAdmin";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function AdminClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, error, loading } = useSession();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Empêcher le rendu de la page avant que l'état de la session soit validé
  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/");
    } else {
      setIsReady(true);
    }
  }, [user, loading, router]);

  if (loading || !isReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} className="animate-spin" />
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

