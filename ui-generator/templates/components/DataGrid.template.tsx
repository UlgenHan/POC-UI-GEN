import React from "react";
import DataGrid from "../../../React-UI-Collection/src/components/complex-components/datagrid/DataGrid.tsx";

export default function DataGridTemplate() {
  return <DataGrid rowKey={"id"} loading={"false"} pageSize={"10"} globalSearchText={""} filterEnabled={"true"} className={""} emptyMessage={"No data available"}>DataGrid</DataGrid>;
}
