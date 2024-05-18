import NavBar from "./Navbar";

export default function Header() {
  return (
    <div className=" flex justify-between my-6 ">
      <h1 className=" ml-10  text-[2rem]">Le Plessis Aux Lys</h1>
      <NavBar />
    </div>
  );
}
