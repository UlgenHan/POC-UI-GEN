import React from "react";
import AnimatedDialog from "../../../React-UI-Collection/src/components/ui/dialogs/AnimatedDialog.tsx";

export default function AnimatedDialogTemplate() {
  return <AnimatedDialog animation={"scale"} confirmText={"Confirm"} cancelText={"Cancel"} showCancel={"true"} className={""}>AnimatedDialog</AnimatedDialog>;
}
