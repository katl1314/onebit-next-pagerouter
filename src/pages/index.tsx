import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json"; // 더미데이터
import BookList from "@/components/book-list";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <BookList books={books} />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <BookList books={books} />
      </section>
    </div>
  );
}

// 레이아웃 구성
// 자바스크립트 함수는 객체이므로 함수에 속성 및 함수 추가 가능.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

// 다음과 같이 함수에 속성, 함수를 추가하면 _app.tsx의 Components에 같이 전달함.
