"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const { collapsed } = useSidebar((state) => state);

  //Ne se produit que dans le client, le server rendering ne le prend pas en compte
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ce composant Skeleton est spécifiquement utilisé pour gérer les erreurs d'hydratation lors du rendu côté serveur (Server Side Rendering - SSR).
  // Il est utilisé pendant le chargement des données obtenues par getRecommended, mais aussi pendant le SSR.

  if (!isClient)
    return (
      <aside className="fixed top-20 space-y-4 left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed top-20 space-y-4 left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
