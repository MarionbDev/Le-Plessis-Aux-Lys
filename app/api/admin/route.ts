import supabase from "@/lib/database";

interface EmailResponse {
  email?: string;
  error?: string;
}
export const getEmailAdmin = async (): Promise<EmailResponse> => {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("email")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.error("Error fetching admin email:", error);
      return { error: "Admin email not found" };
    }

    return { email: data.email };
  } catch (error) {
    console.log("Error fetching email:", error);
    return { error: "Internal server error" };
  }
};
