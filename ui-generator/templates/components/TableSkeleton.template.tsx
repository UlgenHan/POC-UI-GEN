import React from "react";
import TableSkeleton from "../../../React-UI-Collection/src/components/ui/skeletons/TableSkeleton.tsx";

export default function TableSkeletonTemplate() {
  return <TableSkeleton rows={"5"} columns={"4"} showHeader={"true"} animated={"true"} className={""}>TableSkeleton</TableSkeleton>;
}
