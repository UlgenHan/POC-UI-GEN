import React from "react";
import AnimatedToast from "../../../React-UI-Collection/src/components/ui/toasts/AnimatedToast.tsx";

export default function AnimatedToastTemplate() {
  return <AnimatedToast variant={"info"} animation={"slide"} show={"true"} duration={"4000"} className={""}>AnimatedToast</AnimatedToast>;
}
