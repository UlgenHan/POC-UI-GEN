import React from "react";
import ColorSlider from "../../../React-UI-Collection/src/components/ui/sliders/ColorSlider.tsx";

export default function ColorSliderTemplate() {
  return <ColorSlider value={"50"} min={"0"} max={"100"} step={"1"} disabled={"false"} className={""}>ColorSlider</ColorSlider>;
}
