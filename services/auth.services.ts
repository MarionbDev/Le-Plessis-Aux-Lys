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

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reinitialisation-mot-de-passe",
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordWithToken = async (
  // token: string,
  newPassword: string,
) => {
  try {
    // console.log("Token utilisé pour la réinitialisation :", token);
    console.log("Nouveau mot de passe :", newPassword);

    // Vous devez d'abord confirmer le token, puis mettre à jour le mot de passe
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      throw error;
    }

    console.log("Mot de passe mis à jour avec succès.");
  } catch (error) {
    console.error("Erreur dans `updatePasswordWithToken` :", error);
    throw error;
  }
};

