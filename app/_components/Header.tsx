import NavBarDesktop from "./NavaBarDesktop";
import NavBarMobile from "./NavbarMobile";

export default function Header() {
  return (
    <div className=" flex justify-between items-center ">
      <h1 className=" font-title-home text-titleHome_color italic font-extralight  ml-4 md:ml-10   text-2xl md:text-[3rem] tracking-[3px]  ">
        Le Plessis Aux Lys
      </h1>
      <div className=" flex justify-end h-full  ">
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
