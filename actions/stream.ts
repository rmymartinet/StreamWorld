"use server";

import { db } from "@/lib/db";
import { Stream } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const upadteStream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: validData,
    });

    revalidatePath("/u/[username]/chat");
    revalidatePath("/u/[username]");
    revalidatePath("/[username]");

    return upadteStream;
  } catch {
    throw new Error("Stream not found");
  }
};
