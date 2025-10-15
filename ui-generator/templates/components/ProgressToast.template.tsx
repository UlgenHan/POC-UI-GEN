import React from "react";
import ProgressToast from "../../../React-UI-Collection/src/components/ui/toasts/ProgressToast.tsx";

export default function ProgressToastTemplate() {
  return <ProgressToast variant={"info"} show={"true"} duration={"5000"} pauseOnHover={"true"} className={""}>ProgressToast</ProgressToast>;
}
