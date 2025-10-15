import React from "react";
import ListSkeleton from "../../../React-UI-Collection/src/components/ui/skeletons/ListSkeleton.tsx";

export default function ListSkeletonTemplate() {
  return <ListSkeleton items={"5"} showAvatar={"false"} showIcon={"false"} animated={"true"} className={""}>ListSkeleton</ListSkeleton>;
}
