import { Html, Head, Main, NextScript } from "next/document";

// 메타데이터는 _document.tsx에서 처리한다.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
