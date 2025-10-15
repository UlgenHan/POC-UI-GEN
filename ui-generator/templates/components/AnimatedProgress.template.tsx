import React from "react";
import AnimatedProgress from "../../../React-UI-Collection/src/components/ui/progress/AnimatedProgress.tsx";

export default function AnimatedProgressTemplate() {
  return <AnimatedProgress max={"100"} duration={"1000"} easing={"ease-out"} className={""} size={"md"} variant={"default"}>AnimatedProgress</AnimatedProgress>;
}
