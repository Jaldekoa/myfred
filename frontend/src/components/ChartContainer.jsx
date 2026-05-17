import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";

export default function ChartContainer({ seriesId, queryString }) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["series", seriesId, queryString],
    queryFn: async () => {
      const url = `${API_BASE_URL}:${BACKEND_PORT}/api/${seriesId}${queryString ? `?${queryString}` : ``}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      return res.json();
    },
    enabled: !!seriesId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <Chart data={data} />;
}
