import Link from "next/link";

export default function NavbarDesktopAdmin() {
  return (
    <>
      <h2>Bienvenue</h2>
      <div>
        <Link href={"/admin"}>Tableau de bord</Link>
        <Link href={"/admin/tarifs"}>Tarifs</Link>
        <Link href={"/admin/reservations"}>Réservations</Link>
        <Link href={"/admin/activites"}>Activités</Link>
        <Link href={"/admin/gite&chambres"}>Gîte et Chambres</Link>
      </div>
    </>
  );
}

