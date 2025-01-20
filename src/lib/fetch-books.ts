export default async function fetchBooks<T>(path?: string): Promise<T> {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const hostname = `http://localhost:12345/book/${path ?? ""}`;
  // 도서 리스트 조회

  const response = await fetch(`${hostname}`, config);

  if (!response.ok) {
    throw new Error();
  }
  const books = await response.json();

  return books;
}
