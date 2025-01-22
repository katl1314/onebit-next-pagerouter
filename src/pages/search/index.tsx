import React from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookList from "@/components/book-list";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types/type";
import Head from "next/head";
import { useRouter } from "next/router";

// getServerSideProps => Page Router에서 SSR를 처리하기 위한 함수
// 페이지 컴포넌트 호출 전에 먼저 실행함.
export const getServerSideProps = async (props: GetServerSidePropsContext) => {
  // GetServerSidePropsContext에는 페이지에 요청한 모든 정보들이 포함됨. query까지.
  const { name } = props.query;

  const searchs = await fetchBooks<BookData[]>(`search?q=${name}`);
  console.log(searchs);
  return {
    props: {
      books: searchs,
    },
  };
};

// querystring은 사용자가 요청시 전달되므로 getStaticProps에서 query가져올 수없다.
// 만약 SSG에서 검색을 처리하고자 할때는 리액트 처럼 마운트 이후에 가져와야함.

// Next.js는 쿼리스트링을 읽는 과정에서 2번 렌더링한다.
// 폴더 search내 index.tsx파일을 생성하면 /search로 접근 가능함.
const Search = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>도서 검색 결과: {router.query.name}</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <BookList books={books} />
    </div>
  );
};

// Seachable Layout 추가
Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Search;
