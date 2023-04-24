import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../utils/services";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import BaseLayout from "./BaseLayout";
import BooksAddModifyForm from "./BooksAddModifyForm";
import BooksList from "./BooksList";

export default function Books() {
  const getBooksQuery = useQuery({
    queryKey: [BOOKS_QUERY_KEY],
    queryFn: getBooks,
  });

  return (
    <BaseLayout>
      <BooksAddModifyForm formOperationType={"add"} />
      {getBooksQuery.isLoading && (
        <div className="mb-3 mt-6 text-center">loading...</div>
      )}
      {getBooksQuery.isFetched && <BooksList books={getBooksQuery.data!} />}
    </BaseLayout>
  );
}
