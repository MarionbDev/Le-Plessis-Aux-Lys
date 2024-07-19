import supabase from "@/lib/database"; // Assurez-vous que ce chemin est correct
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface ErrorType {
  message: string;
}

export default function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        // Récupérer la session actuelle
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        const { session } = sessionData;
        setUser(session?.user || null);
        const token = session?.access_token || null;
        setAccessToken(token);

        if (token) {
          localStorage.setItem("authToken", token);
          // console.log("Token saved to localStorage:", token);
        } else {
          localStorage.removeItem("authToken");
          // console.log("Token removed from localStorage");
        }
      } catch (error: any) {
        console.error("Error fetching session:", error);
        setError({ message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        throw error;
      }
      const { session } = data;
      setUser(session?.user || null);
      const token = session?.access_token || null;
      setAccessToken(token);

      if (token) {
        localStorage.setItem("authToken", token);
        // console.log("Token refreshed and saved to localStorage:", token);
      } else {
        localStorage.removeItem("authToken");
        // console.log("Token removed from localStorage");
      }

      // console.log(
      //   "Current localStorage after refresh:",
      //   localStorage.getItem("authToken"),
      // );
    } catch (error: any) {
      console.error("Error refreshing session:", error);
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, refreshSession, accessToken };
}

