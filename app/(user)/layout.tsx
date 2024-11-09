// app/layout.tsx
import Footer from "../_components/Footer";
import NavBarMobile from "../_components/NavbarMobile";
import NavbarUser from "../_components/NavbarUserDesktop";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" ">
      <div className=" fixed top-0 z-50 bg-none bg-transparent">
        <NavbarUser />
        <NavBarMobile />
      </div>
      <main> {children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

