import NavBarDesktop from "./NavaBarDesktop";
import NavBarMobile from "./NavbarMobile";

export default function Header() {
  return (
    <div className=" flex justify-end my-6   ">
      <div className=" navbar-mobile">
        <NavBarMobile />
      </div>
      <div className=" navbar-desktop my-4">
        <NavBarDesktop />
      </div>
    </div>
  );
}
