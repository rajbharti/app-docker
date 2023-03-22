import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import BooksAddHeader from "./components/BooksAddHeader";

// create a client
const queryClient = new QueryClient();

function App() {
  return (
    // provide the client to your app
    <QueryClientProvider client={queryClient}>
      <Header />
      <BooksAddHeader />
    </QueryClientProvider>
  );
}

export default App;
