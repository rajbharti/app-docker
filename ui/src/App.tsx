import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Books from "./components/Books";

// create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    // provide the client to your app
    <QueryClientProvider client={queryClient}>
      <Books />
    </QueryClientProvider>
  );
}
