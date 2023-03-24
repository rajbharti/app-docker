import { IBook } from "../utils/types";
import BookItem from "./BookItem";
interface Props {
  books: [] | IBook[];
}
export default function BooksList({ books }: Props) {
  return (
    <section>
      <ul>
        {books.map((book: IBook) => (
          <BookItem key={book._id} {...book} />
        ))}
      </ul>
    </section>
  );
}
