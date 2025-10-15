import React from "react";
import AnimatedSkeleton from "../../../React-UI-Collection/src/components/ui/skeletons/AnimatedSkeleton.tsx";

export default function AnimatedSkeletonTemplate() {
  return <AnimatedSkeleton width={"w-full"} height={"h-4"} rounded={"md"} variant={"shimmer"} className={""}>AnimatedSkeleton</AnimatedSkeleton>;
}
