import type {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  PropsWithChildren,
} from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./searchable-layout.module.css";

// 페이지별 레이아웃 구성 (검색가능한 레이아웃)
const SearchableLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { name } = router.query; // dom접근 시 ref를 사용한다.
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = (name ?? "") as string;
    }
  }, [name]); // router.query.name이 변경될때 실행한다.

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    // 값 변경 시 상태값을 갱신한다.
    setSearch(ev.target.value);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    const { key } = ev;
    if (key === "Enter") {
      // Enter 클릭 시 Submit
      onSubmit();
    }
  };

  const onSubmit = () => {
    // 검색 시 /search 페이지를 불러온다.
    if (name === search) return; // querystring값과 검색어랑 일치하면 굳이?
    if (!search) {
      alert("검색어를 입력하시오.");
      return;
    }
    router.push(`/search?name=${search}`);
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
