// type을 반환하면 import type으로...
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  time: Date;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 현재 시간을 반환하는 API Routes
  return res.status(200).json({
    time: new Date(),
  });
}
