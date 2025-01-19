import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
// 글로벌 레이아웃 작업은 _app.tsx에서 처리한다.
// 화면에 표시할 페이지 컴포넌트가 _app.tsx의 App에 전달된다.

// NextComponentType과 합친다.
// 기본 Component의 타입에는 getLayout이 없기 때문에 확장해야함.
// https://blog.woolta.com/categories/1/posts/183
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type ComponentWithLayout = {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppProps & ComponentWithLayout) {
  // 페이지 별 레이아웃 없으면 그대로 출력한다.
  const PageLayout = Component?.getLayout ?? ((page: ReactNode) => page);

  return (
    <GlobalLayout>{PageLayout(<Component {...pageProps} />)}</GlobalLayout>
  );
}

// 현재 요청한 페이지 컴포넌트를 App 컴포넌트에 컴포넌트와 프롭스를 전달하여 렌더링한다.
