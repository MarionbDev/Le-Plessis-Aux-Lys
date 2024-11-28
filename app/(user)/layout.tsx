// app/layout.tsx
import ButtonScrollTop from "../_components/ButtonScrollTop";
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
      <nav className=" fixed top-0 md:w-full z-50 bg-none bg-transparent">
        <NavbarUser />
        <NavBarMobile />
      </nav>
      <ButtonScrollTop />
      <main className="min-h-screen"> {children}</main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

