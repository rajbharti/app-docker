import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import Books from "./components/Books";
import "react-toastify/dist/ReactToastify.css";

const onError = (error: any) => {
  toast(error.message, {
    type: "error",
    theme: "dark",
  });
};

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
  queryCache: new QueryCache({
    onError,
  }),
  mutationCache: new MutationCache({
    onError,
  }),
});

export default function App() {
  return (
    // provide the client to your app
    <QueryClientProvider client={queryClient}>
      <Books />
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
