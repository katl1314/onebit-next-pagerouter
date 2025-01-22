// On-Demend ISR 주문형 재생성 => 사용자가 요청하는 시점에 페이지를 재생성한다.

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/"); // 특정 페이지에 대해 재생성하도록 설정.
    return res.json({ revalidate: true });
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).send("Revalidation Failed"); // 서버 에러
  }
}
