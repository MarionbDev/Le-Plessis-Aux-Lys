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
    <>
      <ul className="flex flex-col items-center mt-10 md:mt-[7.5rem] gap-8 ">
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

        <Toaster
          toastOptions={{
            style: {
              background: "#f5f7dc ",
            },
          }}
        />
      </ul>
    </>
  );
}

