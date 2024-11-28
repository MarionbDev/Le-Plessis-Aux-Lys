"use client";

import { getAllRentals } from "@/app/api/rentals/route";
import { ListRentalsDetailsProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ListDetails from "./ListDetails"; // Import du composant ListDetails
import UpdateDetailsRental from "./UpdateDetailsRental";

export default function DetailsRentalPage() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const modalUpdate = searchParams.get("modal-edit");
  const rentalId = searchParams.get("rentalId");
  const pathname = usePathname();

  const [rentalsDetails, setRentalsDetails] = useState<
    ListRentalsDetailsProps[]
  >([]);

  // Fonction pour récupérer les détails des locations
  const fetchDetailsRental = async () => {
    try {
      console.log("Appel à getAllRentals...");
      const allDetailsRentals = await getAllRentals();
      console.log("Données récupérées:", allDetailsRentals); // Vérifiez les données ici
      if (allDetailsRentals) {
        setRentalsDetails(allDetailsRentals); // Mettez à jour l'état si les données sont valides
      } else {
        console.error("Les données récupérées ne sont pas un tableau.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des locations:", error);
    }
  };

  useEffect(() => {
    if (!modal && !modalUpdate) {
      fetchDetailsRental(); // Appel pour récupérer les données lors du montage du composant
    }
  }, [modal, modalUpdate]);

  return (
    <div className="pb-20 flex flex-col items-center">
      {/* Modal d'ajout d'une location */}

      {/* Modal de mise à jour d'une location */}
      {modalUpdate && rentalId && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className=" relative gap-10">
              <UpdateDetailsRental rentalId={rentalId} />
              <Link href={pathname}>
                <Button
                  type="button"
                  className="absolute top-0 right-0 p-2 hover:scale-125 "
                >
                  <X />
                </Button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
      {/* Liste des locations */}
      <div className="flex justify-center w-full">
        <ListDetails
          rentalsDetails={rentalsDetails}
          setRentalsDetails={setRentalsDetails}
        />
      </div>
    </div>
  );
}

