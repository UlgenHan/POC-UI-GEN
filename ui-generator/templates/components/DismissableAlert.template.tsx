import React from "react";
import DismissableAlert from "../../../React-UI-Collection/src/components/ui/alerts/DismissableAlert.tsx";

export default function DismissableAlertTemplate() {
  return <DismissableAlert variant={"info"} show={"true"} autoClose={"false"} duration={"5000"} className={""}>DismissableAlert</DismissableAlert>;
}
