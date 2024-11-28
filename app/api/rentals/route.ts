import {
  ListRentalsDetailsProps,
  UpdatedRates,
  UpdateRentalDetails,
} from "@/app/types";
import supabase from "@/lib/database";

export const getAllRentals = async () => {
  try {
    const { data: allRentals, error } = await supabase
      .from("rentals")
      .select("*")
      .order("title_rental", { ascending: true });
    console.log("allrentals api", allRentals);

    if (error) throw error;
    console.log("data rentals :", allRentals);

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
        title: updatePrices.lowSeasonRateNight,
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

export const updateRentalDetails = async (
  id: string,
  updateRentalDetails: UpdateRentalDetails,
) => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .update({
        title_rental: updateRentalDetails.title_rental,
        capacity_rental: updateRentalDetails.capacity_rental,
        description_rental: updateRentalDetails.description_rental,
      })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error update rental details", error);
    throw error;
  }
};

export const getRentalById = async (
  id: string,
): Promise<ListRentalsDetailsProps> => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .select("*")
      .eq("id", id)
      .single();
    console.log("route api rentals :", data);
    if (error) {
      console.error("Error Fetched rental details id:", error);
      throw error;
    }
    return data as ListRentalsDetailsProps;
  } catch (error) {
    console.error("Error fetching rental details id", error);
    throw error;
  }
};

export const deleteRental = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.from("rentals").delete().eq("id", id);
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error("Error deleting rentals:", error.message);
    throw error;
  }
};

