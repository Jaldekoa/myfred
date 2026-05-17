import { useQuery } from "@tanstack/react-query";
import ChartContainer from "./ChartContainer";
import Search from "./Search";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export default function Dashboard(series_id, queryString) {
  const [searchParams, setParams] = useState(null);

  const handleSearch = (seriesId, queryString) => {
    setSearchParams({ seriesId, queryString });
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      {searchParams && (
        <ChartContainer
          seriesId={searchParams.seriesId}
          queryString={queryString}
        />
      )}
    </>
  );
}
