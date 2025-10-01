import { useEffect, useState } from "react";

export type Fetcher = <T = unknown>(url: string, init?: RequestInit) => {
  data: T;
  loading: boolean;
  error: Error | null;
};

/**
 *
 * @param url The URL to fetch data from
 * @param init Optional fetch initialization parameters
 * @returns An object containing the fetched data, loading state, and error state
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useFetch<MyDataType>("https://api.example.com/data", {
 *  method: "GET",
 *  headers: {
 *     "Content-Type": "application/json",
 *     "Authorization": `Bearer ${token}`
 *  } // Optional fetch init options
 * });
 * ```
 */
export const useFetch: Fetcher = (url: string, init?: RequestInit) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, init);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, init]);

  return {
    data,
    loading,
    error
  }
}
