import Link from "next/link";
import type { FC, PropsWithChildren } from "react";
import style from "./global-layout.module.css"; // 스타일이 객체로 가져옴.
// 글로벌 레이아웃 작업

const GlobalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @katl1314</footer>
    </div>
  );
};

export default GlobalLayout;
