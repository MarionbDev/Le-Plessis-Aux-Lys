import supabase from "@/lib/database";

export const getAllRentals = async () => {
  try {
    const { data: allRentals, error } = await supabase
      .from("rentals")
      .select(`*`);

    if (error) throw error;
    console.log("Fetched prices:", allRentals);

    return allRentals;
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};

