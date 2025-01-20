import React from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookList from "@/components/book-list";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

// getServerSideProps => Page Router에서 SSR를 처리하기 위한 함수
// 페이지 컴포넌트 호출 전에 먼저 실행함.
export const getServerSideProps = async (props: GetServerSidePropsContext) => {
  // GetServerSidePropsContext에는 페이지에 요청한 모든 정보들이 포함됨. query까지.
  const { name } = props.query;

  const searchs = await fetchBooks(`search?q=${name}`);
  console.log(searchs);
  return {
    props: {
      books: searchs,
    },
  };
};

// Next.js는 쿼리스트링을 읽는 과정에서 2번 렌더링한다.
// 폴더 search내 index.tsx파일을 생성하면 /search로 접근 가능함.
const Search = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

// Seachable Layout 추가
Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Search;
