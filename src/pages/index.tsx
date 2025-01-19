import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스 페이지입니다.</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

// 레이아웃 구성
// 자바스크립트 함수는 객체이므로 함수에 속성 및 함수 추가 가능.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

// 다음과 같이 함수에 속성, 함수를 추가하면 _app.tsx의 Components에 같이 전달함.
