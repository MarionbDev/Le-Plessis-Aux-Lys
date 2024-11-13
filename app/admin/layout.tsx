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
    <section className=" h-screen font-text">
      <NavbarDesktopAdmin />
      <NavBarMobileAdmin />

      {children}
    </section>
  );
}

