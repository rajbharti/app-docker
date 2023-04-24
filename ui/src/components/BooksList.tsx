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
        <div className="text-center mt-6 mb-3 text-slate-400">No data!</div>
      )}
    </section>
  );
}
