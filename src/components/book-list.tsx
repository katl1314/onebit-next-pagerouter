import books from "@/mock/books.json";
import BookItem from "./book-item";
import { BookData } from "@/types/type";
type BookListTypes = { books: BookData[] };

export default function BookList({ books }: BookListTypes) {
  return books.map((book) => {
    // Array.prototype.map을 사용하여 여러 컴포넌트를 렌더링 시 key속성을 사용한다.
    return <BookItem key={book.id} {...book}></BookItem>;
  });
}
