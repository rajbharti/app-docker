import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Books } from "../types";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import { deleteBook } from "../utils/services";
import BooksAddModifyForm from "./BooksAddModifyForm";
import Modal from "./Modal";

export default function BookItem(book: Books) {
  const [toggleForm, setToggleForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleDeleteConfirm = () => {
    deleteBookMutation.mutate(book._id as string);
    handleCloseModal();
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
        <div className="flex items-baseline justify-between gap-2">
          <div className="basis-1/4">{book.category}</div>
          <div className="basis-1/3">{book.name} </div>
          <div className="w-28 text-right">
            Rs. {book.price.toLocaleString()}
          </div>
          <div className="text-right">
            <button
              className="mr-1 border-green-300 text-green-500 hover:text-green-700"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="border-red-300 text-red-500 hover:text-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        title="Are you sure want to delete?"
        confirmLabel="Yes"
        denyLabel="No"
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />
    </li>
  );
}
