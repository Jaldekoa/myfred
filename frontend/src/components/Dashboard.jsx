import ChartContainer from "./ChartContainer";
import Search from "./Search";
import { useState } from "react";
import SavedSeriesList from "./SavedSeriesList";
import { useSavedSeries } from "../hooks/useSavedSeries";
import { Toaster } from "sonner";

export default function Dashboard() {
  const [currentSeriesId, setCurrentSeriesId] = useState("");
  const { savedSeries, saveSeries, removeSeries } = useSavedSeries();

  const handleSearch = (seriesId) => {
    setCurrentSeriesId(seriesId);
  };

  return (
    <main className="dashboard">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "app-toast",
          duration: 3000,
        }}
      />
      <Search onSearch={handleSearch} />

      {currentSeriesId && (
        <ChartContainer
          seriesId={currentSeriesId}
          onSeriesLoaded={saveSeries}
        />
      )}

      <SavedSeriesList
        savedSeries={savedSeries}
        onSelect={handleSearch}
        onRemove={removeSeries}
      />
    </main>
  );
}
