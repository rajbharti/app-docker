import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type FormInput = {
  category: string;
  name: string;
  price: number;
};

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

function BooksAddHeader() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutation.mutate(data);
  };

  //   console.log("errors", errors);

  // access the client
  const queryClient = useQueryClient();

  // queries
  const query = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/books");
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3001/books", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("category")}>
          <option value="">Select category</option>
          {category.map((value: string) => (
            <option key={value.toString()} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input {...register("name")} placeholder="Enter book name" />
        <input type="number" {...register("price")} placeholder="Enter price" />
        <input type="submit" value="Save" />
      </form>

      <ul>
        {query.data?.map((books) => (<li key={books._id}>{books.category}, {books.name}, {books.price}</li>))}
      </ul>
    </>
  );
}

export default BooksAddHeader;
