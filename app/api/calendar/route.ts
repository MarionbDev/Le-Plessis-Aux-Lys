import { CalendarEvent } from "@/app/types";
import supabase from "@/lib/database";

export const getAllCalendar = async (
  rental_type: CalendarEvent["rental_type"],
): Promise<CalendarEvent[]> => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .select("*")
      .eq("rental_type", rental_type);
    if (error) throw error;
    return data as CalendarEvent[];
  } catch (error) {
    throw error;
  }
};

export const addCalendar = async (
  event: CalendarEvent,
): Promise<CalendarEvent[]> => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .insert([event])
      .select();
    if (error) throw error;
    return data as CalendarEvent[];
  } catch (error) {
    console.error("Error adding calendar event:", error);
    throw error;
  }
};

