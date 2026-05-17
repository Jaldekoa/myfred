import { useSearch } from "../hooks/useSearch";
import { useEffect, useState, useRef } from "react";
import { Toaster, toast } from "sonner";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchId, setSearchId] = useState("");
  const { series, loading, error } = useSearch(searchId, {});

  const toastRef = useRef(null);

  const handleSearch = () => {
    if (inputValue.trim()) setSearchId(inputValue);
  };

  useEffect(() => {
    if (loading) {
      toastRef.current = toast.loading(`Cargando ${searchId.toUpperCase()}...`);
    }

    if (!loading) {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
        toastRef.current = null;
      }
      if (error) {
        toast.error(`Error: ${error}`);
      }
    }
  }, [loading, error, searchId]);

  return (
    <form>
      <input
        type="text"
        placeholder="Search data..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Toaster />
      <button type="button" onClick={handleSearch} aria-label="Search">
        Buscar
      </button>

      {error && <p>Error: {error}</p>}
      {series && <pre>{JSON.stringify(series, null, 2)}</pre>}
    </form>
  );
}
