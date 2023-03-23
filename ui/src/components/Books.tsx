import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { IBook } from "../types";
import { getBooks, saveBook } from "../services";
import BaseLayout from "../layout/BaseLayout";
import BooksAddModifyForm from "./BooksAddModifyForm";
import BooksList from "./BooksList";

export default function Books() {
  // access the client
  const queryClient = useQueryClient();

  // queries
  const query = useQuery({
    queryKey: ["books"],
    queryFn: async () => await getBooks(),
  });

  console.log({ query });
  // mutation
  const mutation = useMutation({
    mutationFn: async (data: IBook) => await saveBook(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const onSubmit: SubmitHandler<IBook> = (data: IBook) => {
    mutation.mutate(data);
  };

  return (
    <BaseLayout>
      <BooksAddModifyForm onSubmit={onSubmit} />
      {query.isLoading && "loading..."}
      {query.isFetched && <BooksList data={query.data} />}
    </BaseLayout>
  );
}
