import React from "react";
import ClosableToast from "../../../React-UI-Collection/src/components/ui/toasts/ClosableToast.tsx";

export default function ClosableToastTemplate() {
  return <ClosableToast variant={"info"} show={"true"} autoClose={"false"} duration={"5000"} className={""}>ClosableToast</ClosableToast>;
}
