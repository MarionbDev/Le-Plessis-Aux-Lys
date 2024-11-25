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

// UPDATE EMAIL ADMIN
export const updateEmail = async (
  newEmail: string,
  { email, password }: { email: string; password: string },
) => {
  try {
    // Authentifie l'utilisateur avec ses identifiants
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      console.error(
        "Erreur lors de la connexion de l'utilisateur :",
        loginError.message,
      );
      throw loginError;
    }

    console.log(
      "Utilisateur connecté avec succès pour mise à jour de l'email :",
      email,
    );

    // Mise à jour de l'email avec confirmation
    const { data: updateData, error: updateError } =
      await supabase.auth.updateUser({
        email: newEmail,
      });

    if (updateError) {
      console.error(
        "Erreur de mise à jour de l'email :",
        updateError.message,
        updateError,
      );
      throw updateError;
    }

    console.log("Mise à jour réussie, confirmation envoyée :", updateData);

    // Mettre à jour l'email dans la table 'admin' en utilisant l'auth.uid() pour garantir l'update de l'utilisateur connecté
    const { data: adminUpdateData, error: adminUpdateError } = await supabase
      .from("admin")
      .update({ email: newEmail })
      .eq("email", email); // Ici, on utilise l'email initial pour identifier l'utilisateur

    if (adminUpdateError) {
      console.error(
        "Erreur de mise à jour de l'email dans la table 'admin' :",
        adminUpdateError.message,
      );
      throw adminUpdateError;
    }

    console.log(
      "Mise à jour de l'email dans la table 'admin' réussie :",
      adminUpdateData,
    );

    // Vérification du processus de confirmation (si nécessaire)
    if (updateData?.user?.email) {
      console.log(`Un email de confirmation a été envoyé à ${newEmail}`);
    }

    return updateData;
  } catch (error) {
    console.error("Erreur globale lors de la mise à jour de l'email :", error);
    throw error;
  }
};

// UPDATE PASSWORD ADMIN
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
    // Vérifie si l'email existe dans la base
    const { data: user, error: userError } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !user) {
      throw new Error("Email non enregistré.");
    }

    // Si l'utilisateur existe, initie la réinitialisation
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

    // Confirmer le token, puis mettre à jour le mot de passe
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

