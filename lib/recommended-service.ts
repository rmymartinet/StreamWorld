import { db } from "./db";

export const getRecommanded = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
