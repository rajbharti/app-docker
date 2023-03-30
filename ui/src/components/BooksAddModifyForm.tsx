import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { BooksInterface, FormOperationType } from "../utils/types";
import { BOOKS_QUERY_KEY } from "../utils/constants";
import { saveBook, updateBook } from "../utils/services";

const schema = z.object({
  category: z.string().min(1),
  name: z.string().trim().min(5),
  price: z.coerce.number().min(1).max(999),
});

const booksCategory: string[] = [
  "JavaScript",
  "Typescript",
  "React",
  "Python",
  "Docker",
];

interface PropsInterface {
  formOperationType: FormOperationType;
  setToggleForm?: (toggle: boolean) => void;
  book?: BooksInterface;
}

export default function BooksAddModifyForm({
  formOperationType,
  setToggleForm,
  book,
}: PropsInterface) {
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
  } = useForm<BooksInterface>({
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

  const onSubmit: SubmitHandler<BooksInterface> = (data: BooksInterface) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register("category")}
        defaultValue={fieldInitialValues.category}
        style={errors.category ? { border: "1px solid red" } : undefined}
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
        placeholder="Enter book name"
        defaultValue={fieldInitialValues.name}
        style={errors.name ? { border: "1px solid red" } : undefined}
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Enter price"
        defaultValue={fieldInitialValues.price}
        style={errors.price ? { border: "1px solid red" } : undefined}
      />
      <input type="submit" value="Save" />
      {formOperationType === "add" && <input type="reset" value="Reset" />}
      {formOperationType === "edit" && (
        <input type="button" value="Cancel" onClick={handleCancel} />
      )}
    </form>
  );
}
