import { useState } from "react";
import {
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import { IBook } from "../utils/types";
import { OperationType } from "../utils/constants";
import { deleteBook } from "../utils/services";
import BooksAddModifyForm from "./BooksAddModifyForm";

export default function BookItem(book: IBook) {
  const [toggleForm, setToggleForm] = useState(false);

  const queryClient: QueryClient = useQueryClient();

  const deleteBookMutation = useMutation({
    mutationFn: async (_id: string) => await deleteBook(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
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
          operationType={OperationType.EDIT}
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
