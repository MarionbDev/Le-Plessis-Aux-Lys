import supabase from "@/lib/database";

type CalendarEvent = {
  start_date: string;
  end_date: string;
};

export const getAllCalendar = async () => {
  try {
    const { data, error } = await supabase.from("calendar").select("*");

    if (error) throw error;
    console.log("Fetched calendar :", data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const addCalendar = async ({ start_date, end_date }: CalendarEvent) => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .insert([{ start_date, end_date }])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding calendar event:", error);
    throw error;
  }
};

