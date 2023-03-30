import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { BooksInterface } from "../utils/types";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import { deleteBook } from "../utils/services";
import BooksAddModifyForm from "./BooksAddModifyForm";

export default function BookItem(book: BooksInterface) {
  const [toggleForm, setToggleForm] = useState(false);

  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
    },
  });

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setToggleForm(!toggleForm);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    deleteBookMutation.mutate(book._id as string);
  };

  return (
    <li>
      {toggleForm ? (
        <BooksAddModifyForm
          formOperationType={"edit"}
          setToggleForm={setToggleForm}
          book={book}
        />
      ) : (
        <div>
          {book.category} | {book.name} | {book.price}{" "}
          <button onClick={handleEdit}>Edit</button>{" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
}
