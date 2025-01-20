import React from "react";
import Image from "next/image";
import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types/type";

// 서버 사이드 렌더링
export const getServerSideProps = async (props: GetServerSidePropsContext) => {
  const bookId = props.params?.id ?? 0;
  const book = await fetchBooks<BookData>(`${bookId}`);

  return {
    props: {
      book,
    },
  };
};

// book/1 와 같은 동적 세그먼트만 적용함. 여러 동적 세그먼트 대응 X
const Book = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!book) return new Error("도서정보를 불러오는데 문제가 발생하였습니다.");
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
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
