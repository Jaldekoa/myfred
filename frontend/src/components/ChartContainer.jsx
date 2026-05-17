import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export default function ChartContainer({ seriesId, queryString = "", onSeriesLoaded }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["series", seriesId, queryString],
    queryFn: async () => {
      const url = `${API_BASE_URL}:${BACKEND_PORT}/api/${seriesId}${queryString ? `?${queryString}` : ``}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Error HTTP ${res.status}`);
      }

      if (json.error_message) {
        throw new Error(json.error_message);
      }

      return json;
    },
    enabled: !!seriesId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.observations?.length) {
      onSeriesLoaded(seriesId, data);
    }
  }, [data, onSeriesLoaded, seriesId]);

  useEffect(() => {
    const toastId = `series-${seriesId}`;

    if (isLoading) {
      toast.loading(`Cargando ${seriesId}...`, { id: toastId });
      return;
    }

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    if (data?.observations?.length) {
      toast.success(`${seriesId} cargada correctamente`, { id: toastId });
    }
  }, [data, error, isLoading, seriesId]);

  if (isLoading || error) return null;

  return <Chart data={data} seriesId={seriesId} />;
}
