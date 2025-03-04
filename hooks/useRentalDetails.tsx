import { getAllRentals } from "@/app/api/rentals/route";
import { ListRentalsDetailsProps } from "@/app/types";
import { useCallback, useEffect, useState } from "react";

export const useRentalDetails = (
  rentalType: ListRentalsDetailsProps["type"],
) => {
  const [rentals, setRentals] = useState<ListRentalsDetailsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRentalDetails = useCallback(async () => {
    try {
      const ratesData = await getAllRentals();
      const filteredRate = ratesData.find(
        (rental: ListRentalsDetailsProps) => rental.type === rentalType,
      );
      setRentals(filteredRate || null);
      // console.log("🔄 Re-render useRentalDetails");
    } catch (error) {
      setError("Error fetching rates");
    } finally {
      setLoading(false);
    }
  }, [rentalType]);

  useEffect(() => {
    fetchRentalDetails();
  }, [rentalType]);

  return { rentals, loading, error };
};

