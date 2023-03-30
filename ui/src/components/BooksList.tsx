import type { BooksInterface } from "../utils/types";
import BookItem from "./BookItem";
interface PropsInterface {
  books: BooksInterface[];
}
export default function BooksList({ books }: PropsInterface) {
  return (
    <section>
      <ul>
        {books.map((book: BooksInterface) => (
          <BookItem key={book._id} {...book} />
        ))}
      </ul>
    </section>
  );
}
