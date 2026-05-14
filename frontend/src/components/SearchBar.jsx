import { useSearch } from "../hooks/useSearch";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchId, setSearchId] = useState("");
  const { series, loading, error } = useSearch(searchId, {});

  const handleSearch = () => {
    if (inputValue.trim()) setSearchId(inputValue);
  };

  return (
    <section>
      <h1>
        Mi <span>App</span>
      </h1>

      <article>
        <input
          type="text"
          placeholder="Search data..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleSearch()}
        />
        <Toaster />
        <button
          type="button"
          onClick={() => {
            toast.error("Hello from Sonner");
            handleSearch;
          }}
          aria-label="Search"
        >
          Buscar
        </button>
      </article>

      {loading && searchId && <p>Cargando datos de {searchId}...</p>}
      {error && <p>Error: {error}</p>}

      {series && <pre>{JSON.stringify(series, null, 2)}</pre>}
    </section>
  );
}
