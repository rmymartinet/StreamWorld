import { getFollowedUser } from "@/lib/follow-service";
import { getRecommanded } from "@/lib/recommended-service";
import { Following, FollowingSkeleton } from "./following";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
  const recommanded = await getRecommanded();
  const follow = await getFollowedUser();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-6 pt-4 lg:pt-0">
        <Following data={follow} />
        <Recommended data={recommanded} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
