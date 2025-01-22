import React from "react";
import Image from "next/image";
import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types/type";
import { useRouter } from "next/router";
import Head from "next/head";

// 서버 사이드 렌더링
// export const getServerSideProps = async (props: GetServerSidePropsContext) => {
//   const bookId = props.params?.id ?? 0;
//   const book = await fetchBooks<BookData>(`${bookId}`);

//   return {
//     props: {
//       book,
//     },
//   };
// };

// 동적 경로에서 SSG 처리 시 getStaticPaths를 설정해야함.
// SSG 빌드 타임에 생성할 경로를 명확하게 설정해야함.
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
};

// fallback : 동적 경로에 SSG를 적용하기 위해서 getStaticPaths함수에 지정되지 않는 경로를 요청했을때 어떻게 처리할 것인가?
// false : 빌드 타임에 생성되지 않는 페이지에 접근시 무조건 Not-Found를 반환한다.
// 'blocking' : 빌드 타임에 생성되지 않았더라도 SSR처럼 사전렌더링 발생
// true : Props가 제외한 상태로 UI를 렌더링하고 Props를 따로 계산하고 반환한다.

// 동적 라우터에서 SSG 적용하기
export const getStaticProps = async (context: GetStaticPropsContext) => {
  /**
   * {
   *  props: {},
   *  redirect : { destination: '/', permanent: false },
   *  notFound : ture,
   *  revalidate
   * }
   */
  const id = context.params!.id; // ! null이 아니다라는 뜻
  if (!id) {
    return new Error();
  }

  const book = await fetchBooks<BookData>(`${id}`);

  // 만약 도서 정보가 없을때 404 페이지를 표시하고 싶다.
  if (!book) {
    return {
      notFound: true,
    };
  }

  // 페이지 컴포넌트의 props으로 전달한다.
  return {
    props: {
      book,
    },
  };
};

// book/1 와 같은 동적 세그먼트만 적용함. 여러 동적 세그먼트 대응 X
const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // 현재 fallback상태인가? => 로딩중입니다. 표시
  // fallback상태시에도 메타태그를 추가해야한다.
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>{"한입북스"}</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content={"한입북스"} />
          <meta property="og:description" content={"한입북스"} />
        </Head>
        데이터 로딩중입니다.
      </>
    );
  }
  if (!book) return "도서정보를 불러오는데 문제가 발생하였습니다.";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div
        className={style.cover_img_container}
        style={{
          backgroundImage: `url(${coverImgUrl})`,
          height: 500,
        }}
      >
        <Image
          src={coverImgUrl}
          alt={`${title}_${subTitle}`}
          style={{ objectFit: "contain" }}
          width={300}
          height={450}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.info}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Book;
