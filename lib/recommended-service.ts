import { db } from "./db";

import { getSelf } from "./auth-service";

export const getRecommanded = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  //On exclu l'utilisateur connecté
  //On trie par date de création
  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },

      //Protect sensitive data from being exposed ("use client component recommended")
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
