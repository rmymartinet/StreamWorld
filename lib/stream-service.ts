import { db } from "./db";

//Only one stream can exist per user
export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({
    where: {
      userId,
    },
  });

  return stream;
};
