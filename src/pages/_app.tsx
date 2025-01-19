import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { push, prefetch } = useRouter();

  // 버튼 클릭 시 실행하는 핸들러
  const onClickButton = () => {
    // router.replace => 뒤로가기 방지하고 페이지 이동
    // router.back => 뒤로 가기
    push("/test"); // 클라이언트 사이드 렌더링 방식으로 페이지 이동
  };

  useEffect(() => {
    // 컴포넌트가 마운트 되는 시점
    // pre-fetching적용
    prefetch("/test"); // 특정 페이지를 프리페칭한다.
  }, []);
  return (
    <>
      <header>
        <Link href={"/"}>Index</Link>&nbsp;
        {/* prefetching을 해제도 가능함. */}
        <Link href={"/search"} prefetch={false}>
          Search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>Book/1</Link>&nbsp;
        <div>
          <button onClick={onClickButton}>/test 페이지 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
