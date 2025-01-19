import React from "react";
import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";

// Next.js는 쿼리스트링을 읽는 과정에서 2번 렌더링한다.
// 폴더 search내 index.tsx파일을 생성하면 /search로 접근 가능함.
const Search = () => {
  const router = useRouter();
  const { name } = router.query;
  return <div>Search {name}</div>;
};

// Seachable Layout 추가
Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Search;
