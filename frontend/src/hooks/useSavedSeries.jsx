import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "myfred";

function readSavedSeries() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function useSavedSeries() {
  const [savedSeries, setSavedSeries] = useState(() => readSavedSeries());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSeries));
  }, [savedSeries]);

  const saveSeries = useCallback((seriesId, data) => {
    setSavedSeries((currentSeries) => {
      const normalizedSeriesId = seriesId.trim().toUpperCase();
      const nextSeries = currentSeries.filter(
        (series) => series.seriesId !== normalizedSeriesId,
      );

      return [
        {
          seriesId: normalizedSeriesId,
          savedAt: new Date().toISOString(),
          data,
        },
        ...nextSeries,
      ];
    });
  }, []);

  const removeSeries = useCallback((seriesId) => {
    setSavedSeries((currentSeries) =>
      currentSeries.filter((series) => series.seriesId !== seriesId),
    );
  }, []);

  return { savedSeries, saveSeries, removeSeries };
}

export { useSavedSeries };
