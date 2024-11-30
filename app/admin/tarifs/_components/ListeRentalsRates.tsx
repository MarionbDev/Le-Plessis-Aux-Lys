import { getAllRentals } from "@/app/api/rentals/route";
import { useEffect, useState } from "react";
import RateRentalCardAdmin from "./Rate";

type Rental = {
  id: string;
  name: string;
  type:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
  price_low_season_night: number;
  price_high_season_night: number;
  price_low_season_week: number;
  price_high_season_week: number;
};

export default function ListRentalRates() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  // Mappage entre types et noms personnalisés
  const rentalNames: Record<Rental["type"], string> = {
    petiteOurse: "Le Logis de la petite Ourse",
    grandeOurse: "Le Logis de la grande Ourse",
    orion: "Orion",
    cassiopee: "Cassiopée",
    andromede: "Andromède",
    pegase: "Suite familiale Pégase",
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsData: Rental[] = await getAllRentals();
        const sortedRentals = sortRentals(rentalsData);
        setRentals(sortedRentals);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const sortRentals = (rentals: Rental[]) => {
    return rentals.sort((a, b) => {
      const order = [
        "petiteOurse",
        "grandeOurse",
        "orion",
        "cassiopee",
        "andromede",
        "pegase",
      ];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
  };

  return (
    <div className=" flex flex-col py-20 mt-6 lg:mt-0">
      <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-8 lg:my-8">
        <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
        <h1 className="text-text_color font-semibold text-center lg:text-lg uppercase ">
          Mise à jour des tarifs
        </h1>
        <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
      </div>
      <div className="flex flex-wrap gap-12 md:gap-x-32 md:mx-10 justify-center mt-16 lg:mt-6">
        {rentals.map((rental) => (
          <RateRentalCardAdmin
            key={rental.id}
            id={rental.id}
            nameRental={rentalNames[rental.type]}
            lowSeasonRateNight={rental.price_low_season_night}
            highSeasonRateNight={rental.price_high_season_night}
            lowSeasonRateWeek={rental.price_low_season_week}
            highSeasonRateWeek={rental.price_high_season_week}
          />
        ))}{" "}
      </div>
    </div>
  );
}

