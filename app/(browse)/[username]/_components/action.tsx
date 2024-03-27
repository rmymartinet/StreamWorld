"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Failed to follow"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Failed to follow"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Failed to block"));
    });
  };

  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Failed to unblock"));
    });
  };

  const onCLick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const onBlockClick = () => {
    if (isBlocking) {
      handleUnBlock();
    } else {
      handleBlock();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onCLick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={onBlockClick} disabled={isPending} variant="primary">
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
