import { useEffect } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IBook } from "../utils/types";
import { OperationType } from "../utils/constants";
import { saveBook, updateBook } from "../utils/services";
interface Props {
  operationType: OperationType;
  setToggleForm?: (toggle: boolean) => void;
  book?: IBook;
}

const schema = z.object({
  category: z.string().min(1),
  name: z.string().trim().min(5),
  price: z.coerce.number().min(1).max(999),
});

const category: string[] = [
  "JavaScript",
  "Typescript",
  "React",
  "Python",
  "Docker",
];

export default function BooksAddModifyForm({
  operationType,
  setToggleForm,
  book,
}: Props) {
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
  } = useForm<IBook>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const queryClient: QueryClient = useQueryClient();

  const saveBookMutation = useMutation({
    mutationFn: async (data: IBook) => await saveBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: async (data: IBook) => await updateBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setToggleForm?.(false);
    },
  });

  const onSubmit: SubmitHandler<IBook> = (data: IBook) => {
    switch (operationType) {
      case OperationType.ADD:
        saveBookMutation.mutate(data);
        break;
      case OperationType.EDIT:
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
        style={errors.category ? { border: "1px solid red" } : {}}
      >
        <option value="">Select category</option>
        {category.map((value: string) => (
          <option key={value.toString()} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input
        {...register("name")}
        placeholder="Enter book name"
        defaultValue={fieldInitialValues.name}
        style={errors.name ? { border: "1px solid red" } : {}}
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Enter price"
        defaultValue={fieldInitialValues.price}
        style={errors.price ? { border: "1px solid red" } : {}}
      />
      <input type="submit" value="Save" />
      {operationType === OperationType.ADD && (
        <input type="reset" value="Reset" />
      )}
      {operationType === OperationType.EDIT && (
        <input type="button" value="Cancel" onClick={handleCancel} />
      )}
    </form>
  );
}
