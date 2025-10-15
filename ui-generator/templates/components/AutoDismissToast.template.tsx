import React from "react";
import AutoDismissToast from "../../../React-UI-Collection/src/components/ui/toasts/AutoDismissToast.tsx";

export default function AutoDismissToastTemplate() {
  return <AutoDismissToast variant={"info"} show={"true"} duration={"4000"} fadeOutDuration={"300"} className={""}>AutoDismissToast</AutoDismissToast>;
}
