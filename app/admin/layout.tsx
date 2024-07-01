"use client";

import useSession from "@/hooks/useSession";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import NavBarAdmin from "../_components/NavBarAdmin";
import { getIsAuthenticated } from "./middlewares/withAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const { user, error } = useSession();

  useEffect(() => {
    const isAuth = getIsAuthenticated();
    console.log("auth ?", isAuth);
    setLoading(false);
    if (!isAuth) {
      console.log("Redirecting to /");
      setTimeout(() => {
        redirect("/");
      }, 0);
    }
  }, []);
  console.log("User layout : ", user);

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
    <section className="">
      <NavBarAdmin />
      {children}
    </section>
  );
}

