import { setIsAuthenticated } from "@/app/admin/middlewares/withAuth";
import supabase from "@/lib/database";

type PropType = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: PropType) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setIsAuthenticated(true);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

