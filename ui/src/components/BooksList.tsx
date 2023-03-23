import { IBook } from "../types";

interface Props {
  data: IBook[];
}
export default function BooksList({ data }: Props) {
  return (
    <section>
      <ul>
        {data.map((book: IBook) => (
          <li key={book._id}>
            {book.category} | {book.name} | {book.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
