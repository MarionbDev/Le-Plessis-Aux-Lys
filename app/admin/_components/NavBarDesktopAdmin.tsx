import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import styles from "./navDesktopAdmin.module.css";

export default function NavbarDesktopAdmin() {
  const router = useRouter();

  const currentRoute = usePathname();

  const handleLogOut = async () => {
    await logout();
    toast.loading("Déconnexion en cours...");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="navbar-desktop-admin mx-10 mt-8">
      <h1 className="font-title-home text-title_color italic font-extralight text-3xl sm:text-2xl xl:text-[2.6rem] tracking-[3px]  ">
        Le Plessis Aux Lys
      </h1>

      <div className="flex justify-between items-center text-text_color font-text">
        <div className=" gap-6 flex">
          <Link
            href={"/admin"}
            className={`  flex flex-col ${currentRoute === "/admin" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Tableau de bord
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/tarifs"}
            className={`flex flex-col ${currentRoute === "/admin/tarifs" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Tarifs
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/reservations"}
            className={`flex flex-col ${currentRoute === "/admin/reservations" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Réservations
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/details"}
            className={`flex flex-col ${currentRoute === "/admin/details" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Descriptions
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/photos"}
            className={`flex flex-col ${currentRoute === "/admin/photos" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Photos
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/activites"}
            className={`flex flex-col ${currentRoute === "/admin/activites" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Activités
            <span className={styles.underline}></span>
          </Link>

          <Link
            href={"/admin/parametres"}
            className={`flex flex-col ${currentRoute === "/admin/parametre" ? styles.activeLink : styles.nonActiveLink}`}
          >
            <Settings />
            <span className={styles.underline}></span>
          </Link>
        </div>

        <Button
          onClick={handleLogOut}
          role="button"
          className=" logOut gap-2 text-[0.9rem] hover:text-[#bbbb57]"
        >
          <span className="">Se déconnecter</span>

          <LogOut size={22} />
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

