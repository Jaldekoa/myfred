import { useState } from "react";

export default function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [seriesId, setSeriesId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    const params = {
      series_id: seriesId.toUpperCase().trim(),
      file_type: "json",
    };

    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search data..."
        value={seriesId}
        onChange={(event) => {
          seriesId(event.target.value);
        }}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
