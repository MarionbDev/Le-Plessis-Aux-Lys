import { ReactNode } from "react";
import NavBarAdmin from "../_components/NavBarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  //TODO protéger les routes ADMIN avec un middleware
  return (
    <section className="">
      <NavBarAdmin />
      {children}
    </section>
  );
}

