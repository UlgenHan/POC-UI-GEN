import React from "react";
import TextSkeleton from "../../../React-UI-Collection/src/components/ui/skeletons/TextSkeleton.tsx";

export default function TextSkeletonTemplate() {
  return <TextSkeleton lines={"3"} spacing={"md"} lastLineWidth={"w-3/4"} animated={"true"} className={""}>TextSkeleton</TextSkeleton>;
}
