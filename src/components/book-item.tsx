import React, { FC } from "react";
import { BookData } from "@/types/type";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";
const BookItem: FC<BookData> = ({
  id,
  title,
  author,
  subTitle,
  coverImgUrl,
  publisher,
}) => {
  // 클릭 시 상세 페이지 이동
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <div className={style.image_container}>
        {/* Image 컴포넌트에 fill 속성을 적용 시 부모 요소의 크기 따라감 position relative해야함. */}
        <Image src={coverImgUrl} alt={`${title}_${subTitle}`} fill></Image>
      </div>
      <div className={style.info_container}>
        <div className={style.title_container}>
          <h3>{title}</h3>
          <div>{subTitle}</div>
        </div>
        <div className={style.other_container}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
