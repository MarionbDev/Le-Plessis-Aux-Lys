// api/calendar/route.ts
import supabase from "@/lib/database";

type CalendarEvent = {
  rental_type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
  start_date: string;
  end_date: string;
};

export const getAllCalendar = async (
  rental_type: CalendarEvent["rental_type"],
) => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .select("*")
      .eq("rental_type", rental_type);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const addCalendar = async ({
  rental_type,
  start_date,
  end_date,
}: CalendarEvent) => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .insert([{ rental_type, start_date, end_date }])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding calendar event:", error);
    throw error;
  }
};

