import type { Books } from "../types";
import BookItem from "./BookItem";
interface BooksListProps {
  books: Books[];
}
export default function BooksList({ books }: BooksListProps) {
  return (
    <section className="pt-2">
      {books.length > 0 ? (
        <ul>
          {books.map((book: Books) => (
            <BookItem key={book._id} {...book} />
          ))}
        </ul>
      ) : (
        <div className="mb-3 mt-6 text-center text-slate-400">No data!</div>
      )}
    </section>
  );
}
