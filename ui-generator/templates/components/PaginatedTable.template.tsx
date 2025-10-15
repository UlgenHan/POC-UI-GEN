import React from "react";
import PaginatedTable from "../../../React-UI-Collection/src/components/ui/tables/PaginatedTable.tsx";

export default function PaginatedTableTemplate() {
  return <PaginatedTable pageSize={"10"} currentPage={"1"} className={""}>PaginatedTable</PaginatedTable>;
}
