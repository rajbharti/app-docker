import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../utils/services";
import { OperationType } from "../utils/constants";
import BaseLayout from "./BaseLayout";
import BooksAddModifyForm from "./BooksAddModifyForm";
import BooksList from "./BooksList";

export default function Books() {
  const getBooksQuery = useQuery({
    queryKey: ["books"],
    queryFn: async () => await getBooks(),
  });

  console.log({ ...getBooksQuery });

  return (
    <BaseLayout>
      <BooksAddModifyForm operationType={OperationType.ADD} />
      {getBooksQuery.isLoading && "loading..."}
      {getBooksQuery.isFetched && <BooksList books={getBooksQuery.data!} />}
    </BaseLayout>
  );
}
