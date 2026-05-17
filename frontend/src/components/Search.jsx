import { useState } from "react";

export default function Search({ onSearch }) {
  const [seriesId, setSeriesId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedSeriesId = seriesId.trim().toUpperCase();
    if (!normalizedSeriesId) return;

    onSearch(normalizedSeriesId);
    setSeriesId(normalizedSeriesId);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="GDP, UNRATE, CPIAUCSL..."
        value={seriesId}
        onChange={(event) => setSeriesId(event.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
