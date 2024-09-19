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
    <>
      <div className=" flex flex-col py-20">
        <div className="flex flex-wrap gap-12 md:gap-x-32 md:mx-10 justify-center">
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
    </>
  );
}

