"use server";

import { AccessToken, AccessTokenOptions } from "livekit-server-sdk";
import { v4 } from "uuid";

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";

interface ExtendedAccessTokenOptions extends AccessTokenOptions {
  uniqueId?: string;
}

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;
  const uniqueId = v4(); // Génère un identifiant unique

  const tokenOptions: ExtendedAccessTokenOptions = {
    identity: isHost ? `host-${self.id}-${uniqueId}` : `${self.id}`,
    name: self.username,
    uniqueId: uniqueId,
  };

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    tokenOptions
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};