import { getAllRentals } from "@/app/api/rentals/route";
import { useEffect, useState } from "react";
import RateRentalCardAdmin from "./Rate";

type Rental = {
  id: string;
  name: string;
  type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
  price_low_season_night: number;
  price_high_season_night: number;
  price_low_season_week: number;
  price_high_season_week: number;
};

export default function ListRentalRates() {
  const [rentals, setRentals] = useState<Rental[]>([]);

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
      const order = ["gîte", "chambre 1", "chambre 2", "chambre 3"];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
  };

  return (
    <>
      <div className=" flex flex-col  my-20">
        <p className="mb-10 mx-20">Mise à jour des tarifs :</p>
        <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center">
          {rentals.map((rental) => (
            <RateRentalCardAdmin
              key={rental.id}
              id={rental.id}
              nameRental={rental.type}
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

