import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (e) {
    userId = null;
  }

  /**
   *
   * !TODO : Vérifier Le champ blocking n'est pas un tableau. D'après le modèle User que vous avez fourni précédemment, le champ blocking devrait être un tableau de Block. Vous devriez vérifier votre base de données pour vous assurer que c'est bien le cas.
   * ! Il y a des valeurs null dans le champ blocking. Si le champ blocking peut contenir des valeurs null, vous obtiendrez une erreur lorsque vous essayerez d'utiliser l'opération some sur ce champ. Vous devriez vérifier votre base de données pour vous assurer qu'il n'y a pas de valeurs null dans le champ blocking.
   * ! L'ID de l'utilisateur (userId) que vous passez à la requête findMany() est null ou n'est pas valide. Vous devriez vérifier que vous passez un userId valide à la requête findMany().
   */

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            // blocking: {
            //   some: {
            //     blockedId: userId,
            //   },
            // },
          },
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
