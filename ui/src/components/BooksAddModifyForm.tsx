import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classnames from "classnames";
import type { Books, FormOperationType } from "../types";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import { saveBook, updateBook } from "../utils/services";

const schema = z.object({
  category: z.string().min(1),
  name: z.string().trim().min(5),
  price: z.coerce.number().min(50).max(9999),
});

const booksCategory: readonly string[] = [
  "JavaScript",
  "Typescript",
  "React",
  "Python",
  "Docker",
];

interface BooksAndModifyFormProps {
  formOperationType: FormOperationType;
  setToggleForm?: (toggle: boolean) => void;
  book?: Books;
}

export default function BooksAddModifyForm({
  formOperationType,
  setToggleForm,
  book,
}: BooksAndModifyFormProps) {
  const fieldInitialValues = {
    category: book?.category,
    name: book?.name,
    price: book?.price,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<Books>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const queryClient = useQueryClient();

  const saveBookMutation = useMutation({
    mutationFn: saveBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
      setToggleForm?.(false);
    },
  });

  const onSubmit: SubmitHandler<Books> = (data: Books) => {
    switch (formOperationType) {
      case "add":
        saveBookMutation.mutate(data);
        break;
      case "edit":
        updateBookMutation.mutate({ _id: book?._id, ...data });
        break;
    }
  };

  const handleCancel: React.MouseEventHandler<HTMLInputElement> = () => {
    setToggleForm?.(false);
  };

  const handleReset: React.MouseEventHandler<HTMLInputElement> = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-baseline justify-between gap-2"
    >
      <select
        {...register("category")}
        defaultValue={fieldInitialValues.category}
        className={classnames(
          "basis-1/4 bg-white",
          errors.category && "border-red-400"
        )}
      >
        <option value="">Select category</option>
        {booksCategory.map((category: string) => (
          <option key={category.toString()} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        {...register("name")}
        type="text"
        placeholder="Enter book name"
        defaultValue={fieldInitialValues.name}
        className={classnames("w-60", errors.name && "border-red-400")}
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Enter price"
        defaultValue={fieldInitialValues.price}
        className={classnames(
          "w-32 text-right",
          errors.price && "border-red-400"
        )}
      />
      <div className="text-right">
        {formOperationType === "add" && (
          <input type="reset" value="Reset" onClick={handleReset} />
        )}
        {formOperationType === "edit" && (
          <input type="button" value="Cancel" onClick={handleCancel} />
        )}
        <input type="submit" value="Save" className="ml-2" />
      </div>
    </form>
  );
}
