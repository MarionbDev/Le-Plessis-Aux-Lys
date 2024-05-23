import NavBarDesktop from "./NavaBarDesktop";
import NavBarMobile from "./NavbarMobile";

export default function Header() {
  return (
    <div className=" flex justify-between items-center">
      <h1 className="italic font-medium ml-4 md:ml-10 title-home  text-2xl md:text-[3rem] xl:text-[4rem] ">
        Le Plessis Aux Lys
      </h1>
      <div className=" flex justify-end py-4 h-full  ">
        <div className=" navbar-mobile">
          <NavBarMobile />
        </div>
        <div className=" navbar-desktop my-4">
          <NavBarDesktop />
        </div>
      </div>
    </div>
  );
}
