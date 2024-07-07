import { getAllRentals } from "@/app/api/rentals/route";
import { useEffect, useState } from "react";

type Rates = {
  id: string;
  nameRental: string;
  type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
  price_low_season_night: number;
  price_high_season_night: number;
  price_low_season_week: number;
  price_high_season_week: number;
};

export const useRentalRates = (rentalType: Rates["type"]) => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      const ratesData = await getAllRentals();
      const filteredRate = ratesData.find(
        (rate: Rates) => rate.type === rentalType,
      );
      setRates(filteredRate || null);
    } catch (error) {
      setError("Error fetching rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [rentalType]);

  return { rates, loading, error };
};

