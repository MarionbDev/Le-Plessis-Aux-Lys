"use client";

import { getAllRentals } from "@/app/api/rentals/route";
import { useEffect, useState } from "react";
import RateRentalCardAdmin from "./components/Rate";

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
        const rentalsData = await getAllRentals();
        setRentals(rentalsData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center my-20">
        {rentals.map((rental) => (
          <RateRentalCardAdmin
            key={rental.id}
            nameRental={rental.type}
            lowSeasonRateNight={rental.price_low_season_night.toString()}
            highSeasonRateNight={rental.price_high_season_night.toString()}
            lowSeasonRateWeek={rental.price_low_season_week.toString()}
            highSeasonRateWeek={rental.price_high_season_week.toString()}
          />
        ))}
      </div>
    </>
  );
}

