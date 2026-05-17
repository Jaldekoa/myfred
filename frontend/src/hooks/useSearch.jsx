import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

function useSearch(series_id, queryParams = {}) {
  const queryString = new URLSearchParams(queryParams).toString();

  const { data, error, isLoading } = useQuery({
    queryKey: ["legacy-series-search", series_id, queryString],
    queryFn: async () => {
      const url = `${API_BASE_URL}:${BACKEND_PORT}/api/${series_id}${queryString ? `?${queryString}` : ``}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Error HTTP ${res.status}`);
      }

      return json;
    },
    enabled: !!series_id,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    series: data ?? {},
    error: error?.message ?? null,
    loading: isLoading,
  };
}

export { useSearch };
