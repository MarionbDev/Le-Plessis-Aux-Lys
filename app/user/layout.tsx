// app/layout.tsx
import Footer from "../_components/Footer";
import NavbarUser from "../_components/NavbarUser";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed w-screen top-0 z-50 bg-none bg-transparent">
        <NavbarUser />
      </div>
      <main> {children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

