import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navDesktopAdmin.module.css";

export default function NavbarDesktopAdmin() {
  const router = useRouter();

  const currentRoute = usePathname();

  const handleLogOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className=" mx-10 mt-8">
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
            href={"/admin/activites"}
            className={`flex flex-col ${currentRoute === "/admin/activites" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Activités
            <span className={styles.underline}></span>
          </Link>
          <Link
            href={"/admin/gite&chambres"}
            className={`flex flex-col ${currentRoute === "/admin/gite&chambres" ? styles.activeLink : styles.nonActiveLink}`}
          >
            Photos
            <span className={styles.underline}></span>
          </Link>
        </div>

        <Button
          onClick={handleLogOut}
          role="button"
          className=" logOut gap-2 text-md "
        >
          <span>Se déconnecter</span>
          <LogOut />
        </Button>
      </div>
    </div>
  );
}

