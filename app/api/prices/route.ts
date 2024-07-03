import supabase from "@/lib/database";

export const getPrice = async () => {
  try {
    const { data: prices, error } = await supabase.from("price").select("*");

    if (error) throw error;
    console.log("fetch prices :", prices);

    return prices;
  } catch (error) {
    throw error;
  }
};

