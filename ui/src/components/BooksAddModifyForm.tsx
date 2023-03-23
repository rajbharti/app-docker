import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IBook } from "../types";

interface Props {
  onSubmit: (data: IBook) => void;
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

export default function BooksAddModifyForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset, formState } = useForm<IBook>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("category")} defaultValue="">
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
        defaultValue=""
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Enter price"
        defaultValue=""
      />
      <input type="submit" value="Save" />
    </form>
  );
}
