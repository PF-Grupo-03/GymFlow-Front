import { useState, useCallback } from 'react';

export const useFetch = <T, Args extends unknown[]>(
  fetchService: (...args: Args) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchService(...args );
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [fetchService]
  );

  return { data, loading, error, fetchData };
};
