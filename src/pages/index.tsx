import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookList from "@/components/book-list";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types/type";

// SSR를 위한 함수 => 사전 렌더링이 처리됨.
// export const getServerSideProps = async () => {
//   // 페이지 컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터를 불러오는 함수
//   try {
//     const [books, recommends] = await Promise.all([
//       fetchBooks<BookData[]>(""),
//       fetchBooks<BookData[]>("random"),
//     ]);

//     // Home 컴포넌트의 props으로 전달한다. 반환 타입은 반드시 객체타입이어야함.
//     // console.log("서버에서 props를 생성한다.", books, recommends);

//     return {
//       props: {
//         recommends,
//         books,
//       },
//     };
//   } catch (err) {
//     console.log("에러발생");
//     return { props: { recommends: [], books: [] } };
//   }
// };

// SSG 사전 렌더링 방식 페이지 컴포넌트 실행전 실행한다.
export const getStaticProps = async () => {
  try {
    const [books, recommends] = await Promise.all([
      fetchBooks<BookData[]>(""),
      fetchBooks<BookData[]>("random"),
    ]);

    return {
      props: {
        books,
        recommends,
      },
      // revalidate: 10, // 10초 주기마다 페이지 재생성 ISR (단위: sec)
    };
  } catch (err) {
    console.error("Error fetching books:", err);
    return {
      props: {
        books: [],
        recommends: [],
      },
      revalidate: 10,
    };
  }
};

// InferGetServerSidePropsType<typeof getServerSideProps> : 우리가 정의한 getServerSideProps의 반환값 타입을 자동으로 추론한다.
export default function Home({
  books,
  recommends,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("클라이언트 + 서버 한번씩 실행된다");
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <BookList books={recommends} />
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
