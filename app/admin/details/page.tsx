import DetailsRentalPage from "./_components/DetailsRentalsPage";

export default function RentalsDétails() {
  return (
    <>
      {/* <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen ">
            <Loader size={50} className=" animate-spin " />
          </div>
        } 
      >*/}
      <DetailsRentalPage />
      {/* <ListDetails /> */}

      {/* </Suspense> */}
    </>
  );
}

