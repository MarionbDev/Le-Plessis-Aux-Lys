import supabase from "@/lib/database";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface ErrorType {
  message: string;
}

export default function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setUser(data?.session?.user || null);
      } catch (error: any) {
        console.error(error);
        setError({ message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  return { user, loading, error };
}

