import { use, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

function useSearch(series_id, queryParams = {}) {
  const [series, setSeries] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!series_id) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_BASE_URL}:${BACKEND_PORT}/api/${series_id}${queryString ? `?${queryString}` : ``}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        setSeries(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [series_id, JSON.stringify(queryParams)]);

  return { series, error, loading };
}

export { useSearch };
