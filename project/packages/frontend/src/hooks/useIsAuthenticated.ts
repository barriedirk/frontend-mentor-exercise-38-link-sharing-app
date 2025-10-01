import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";

export default function useIsAuthenticated() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      setIsAuth(!!data.session?.access_token);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuth(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return isAuth;
}
