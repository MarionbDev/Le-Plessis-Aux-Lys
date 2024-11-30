import { getRentalById, updateRentalDetails } from "@/app/api/rentals/route";
import { ListRentalsDetailsProps } from "@/app/types";
import { Toaster } from "sonner";
import Details from "./Details";

type ListRentalsProps = {
  rentalsDetails: ListRentalsDetailsProps[];
  setRentalsDetails: React.Dispatch<
    React.SetStateAction<ListRentalsDetailsProps[]>
  >;
};

export default function ListDetails({
  rentalsDetails,
  setRentalsDetails,
}: ListRentalsProps) {
  const handleUpdateRentalDetails = async (id: string): Promise<void> => {
    try {
      const rentalDetailsData = await getRentalById(id);

      if (!rentalDetailsData) {
        throw new Error("Rental détails not found");
      }

      // Mettre à jour l'élément directement dans l'état
      setRentalsDetails((prevRentals) => {
        return prevRentals.map((rental) =>
          rental.id === id ? { ...rental, ...rentalDetailsData } : rental,
        );
      });

      // Optionnel : si vous devez faire un appel API pour mettre à jour, faites-le ici
      await updateRentalDetails(id, rentalDetailsData);
    } catch (error) {
      console.error("Error updating article:", error);
      throw new Error("Failed to update article");
    }
  };
  return (
    <div className="flex flex-col py-20 mt-6 lg:mt-0">
      <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-8 lg:my-8">
        <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
        <h1 className=" text-text_color font-semibold text-center lg:text-lg uppercase ">
          Mise à jour des descriptions
        </h1>
        <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
      </div>
      <ul className="flex flex-col items-center mt-10 md:mt-8  gap-8 ">
        {rentalsDetails.map((detail) => (
          <li key={detail.id} className="">
            <Details
              id={detail.id}
              type=""
              title_rental={detail.title_rental}
              capacity_rental={detail.capacity_rental}
              description_rental={detail.description_rental}
              handleUpdate={handleUpdateRentalDetails}
            />
          </li>
        ))}

        <Toaster />
      </ul>
    </div>
  );
}

