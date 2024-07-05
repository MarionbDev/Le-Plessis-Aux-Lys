"use client";

import useSession from "@/hooks/useSession";
import { ReactNode, useState } from "react";
import NavbarDesktopAdmin from "./_components/NavBarDesktopAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const { user, error, refreshSession } = useSession();

  // const router = useRouter();

  // useEffect(() => {
  //   const isAuthenticated = getIsAuthenticated();

  //   if (!isAuthenticated) {
  //     router.replace("/");
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (getIsAuthenticated()) {
  //     console.log("Refreshing session...");
  //     refreshSession();
  //   }
  // }, []);

  // if (loading) {
  //   return (
  //     <div className=" flex justify-center items-center h-screen">
  //       <Loader size={50} className=" animate-spin" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <p>Une erreur s'est produite : {error.message}</p>;
  // }

  return (
    <section className="">
      <NavbarDesktopAdmin />

      {children}
    </section>
  );
}

