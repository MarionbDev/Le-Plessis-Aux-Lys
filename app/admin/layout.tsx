import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  //TODO protéger les routes ADMIN avec un middleware
  return (
    <div>
      <p>essai layout admin</p>
      {children}
    </div>
  );
}

