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

export const addCalendar = async (event: CalendarEvent): Promise<void> => {
  try {
    const { error } = await supabase.from("calendar").insert([event]).single();

    if (error) {
      throw error;
    }

    // console.log("Event added successfully");
  } catch (error: any) {
    console.error("Error adding calendar event:", error.message);
    throw error;
  }
};

export const deleteCalendar = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.from("calendar").delete().eq("id", id);

    if (error) {
      throw error;
    }

    // console.log("Event deleted successfully");
  } catch (error: any) {
    console.error("Error deleting calendar event:", error.message);
    throw error;
  }
};

// export const updateCalendar = async (
//   id: string,
//   event: CalendarEvent,
// ): Promise<void> => {
//   try {
//     const { error } = await supabase
//       .from("calendar")
//       .update(event)
//       .eq("id", id);

//     if (error) {
//       throw error;
//     }

//     console.log("Event updated successfully");
//   } catch (error: any) {
//     console.error("Error updating calendar event:", error.message);
//     throw error;
//   }
// };

