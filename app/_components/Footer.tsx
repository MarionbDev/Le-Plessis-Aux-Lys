export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="  mt-28  text-lg lg:text-sm p-4 ">
      <div className=" flex flex-col  md:flex-row md:justify-center  gap-4">
        <h4>Contact</h4>
        <h4>Plan du site</h4>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center w-full pt-4 gap-2">
        <p>@Copyright {currentYear} </p>
        {/* <p>Création : Marion Baston </p> */}
        <p>Mentions Légales </p>
      </div>
    </div>
  );
}

// importer logo pour contact + lien du mail
// lien mentions légales

