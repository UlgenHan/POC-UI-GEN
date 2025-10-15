import React from "react";
import AutoFitGrid from "../../../React-UI-Collection/src/components/layout/grid/AutoFitGrid.tsx";

export default function AutoFitGridTemplate() {
  return <AutoFitGrid minColumnWidth={"250px"} maxColumnWidth={"1fr"} gap={"md"} className={""}>AutoFitGrid</AutoFitGrid>;
}
