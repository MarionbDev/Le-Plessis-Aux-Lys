import { UpdatedRates } from "@/app/types";
import supabase from "@/lib/database";

export const getAllRentals = async () => {
  try {
    const { data: allRentals, error } = await supabase
      .from("rentals")
      .select("*");

    if (error) throw error;

    return allRentals;
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};

export const updateRentalPrices = async (
  id: string,
  updatePrices: UpdatedRates,
) => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .update({
        price_low_season_night: updatePrices.lowSeasonRateNight,
        price_high_season_night: updatePrices.highSeasonRateNight,
        price_low_season_week: updatePrices.lowSeasonRateWeek,
        price_high_season_week: updatePrices.highSeasonRateWeek,
      })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error update price", error);
    throw error;
  }
};

