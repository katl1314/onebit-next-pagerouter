import React from "react";
import { useRouter } from "next/router";

// Next.js는 쿼리스트링을 읽는 과정에서 2번 렌더링한다.
// 폴더 search내 index.tsx파일을 생성하면 /search로 접근 가능함.
const Search = () => {
  const router = useRouter();
  const { name } = router.query;
  return <div>Search {name}</div>;
};

export default Search;
