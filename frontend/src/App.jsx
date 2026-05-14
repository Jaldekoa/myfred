import SearchBar from "./components/SearchBar";
import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SearchBar />
      </QueryClientProvider>
    </>
  );
}

export default App;
