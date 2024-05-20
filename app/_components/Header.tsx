import NavBarDesktop from "./NavaBarDesktop";
import NavBarMobile from "./NavbarMobile";

export default function Header() {
  return (
    <div className=" flex justify-between my-6 ">
      <h1 className=" ml-10  lg:text-[2rem]">Le Plessis Aux Lys</h1>
      <div className=" navbar-mobile">
        <NavBarMobile />
      </div>
      <div className=" navbar-desktop">
        <NavBarDesktop />
      </div>
    </div>
  );
}
