import { getAllRentals } from "@/app/api/rentals/route";
import { useCallback, useEffect, useState } from "react";

type Rates = {
  id: string;
  nameRental: string;
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

export const useRentalRates = (rentalType: Rates["type"]) => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const ratesData = await getAllRentals();
      const filteredRate = ratesData.find(
        (rate: Rates) => rate.type === rentalType,
      );

      setRates((prevRates) =>
        JSON.stringify(prevRates) === JSON.stringify(filteredRate)
          ? prevRates
          : filteredRate || null,
      );
      // console.log("🔄 Re-render useRentalRates");
    } catch (err) {
      console.error("Error fetching rates:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [rentalType]);

  useEffect(() => {
    fetchRates();
  }, [rentalType]);

  return { rates, loading, error };
};

