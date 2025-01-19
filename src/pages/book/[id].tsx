import React from "react";
import { useRouter } from "next/router";
import books from "@/mock/books.json";
import Image from "next/image";
import style from "./[id].module.css";

const mockData = books[0]; // 첫번째 데이터를 목업으로하자.

// book/1 와 같은 동적 세그먼트만 적용함. 여러 동적 세그먼트 대응 X
const Book = () => {
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    mockData;
  const router = useRouter();
  const { id } = router.query;

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
