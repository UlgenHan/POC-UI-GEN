import React from "react";
import PositionedToast from "../../../React-UI-Collection/src/components/ui/toasts/PositionedToast.tsx";

export default function PositionedToastTemplate() {
  return <PositionedToast variant={"info"} position={"top-right"} show={"true"} duration={"4000"} className={""}>PositionedToast</PositionedToast>;
}
