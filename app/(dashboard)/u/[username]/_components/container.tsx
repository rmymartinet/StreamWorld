"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { onCollapse, onExpand, collapsed } = useCreatorSidebar(
    (state) => state
  );

  const match = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (match) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [match, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-[70px]" : "lg:ml-60")}>
      {children}
    </div>
  );
};
