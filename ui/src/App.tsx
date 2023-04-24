import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Books from "./components/Books";

// create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    // provide the client to your app
    <QueryClientProvider client={queryClient}>
      <Books />
    </QueryClientProvider>
  );
}
