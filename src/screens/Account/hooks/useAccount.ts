import { fetchAccount } from "@/src/services";
import { type AccountResponse } from "@/src/types/api";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useAccount() {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccount()
      .then(setData)
      .catch((e) => {
        setError(isAxiosError(e) ? e.message : "Failed to load account");
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
