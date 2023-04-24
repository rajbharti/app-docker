import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Books } from "../types";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import { deleteBook } from "../utils/services";
import BooksAddModifyForm from "./BooksAddModifyForm";

export default function BookItem(book: Books) {
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
    <li className="mt-2 border-b-2 border-b-slate-100 pb-2">
      {toggleForm ? (
        <BooksAddModifyForm
          formOperationType={"edit"}
          setToggleForm={setToggleForm}
          book={book}
        />
      ) : (
        <div className="flex gap-2 items-baseline justify-between">
          <div className="basis-1/4">{book.category}</div>
          <div className="basis-1/3">{book.name} </div>
          <div className="w-28 text-right">
            Rs. {book.price.toLocaleString()}
          </div>
          <div className="text-right">
            <button
              className="text-green-500 border-green-300 hover:text-green-700 mr-1"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-red-500 border-red-300 hover:text-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
