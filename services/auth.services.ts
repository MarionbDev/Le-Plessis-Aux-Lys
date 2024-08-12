// import { setIsAuthenticated } from "@/app/admin/middlewares/withAuth";
// import supabase from "@/lib/database";

// type PropType = {
//   email: string;
//   password: string;
// };

// export const loginUser = async ({ email, password }: PropType) => {
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     setIsAuthenticated(true);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     let { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   } catch (error) {
//     throw error;
//   }
// };

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

    const token = data.session?.access_token;
    if (token) {
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;

    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  } catch (error) {
    throw error;
  }
};

export const updateEmail = async (
  newEmail: string,
  { email, password }: PropType,
) => {
  try {
    await loginUser({ email, password });
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (
  newPassword: string,
  { email, password }: PropType,
) => {
  try {
    await loginUser({ email, password });
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

