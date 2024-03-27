import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/action";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  return (
    <div className="mt-40 flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>User Id: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Actions
        userId={user.id}
        isFollowing={isFollowing}
        isBlocking={isBlocked}
      />
    </div>
  );
};

export default UserPage;
