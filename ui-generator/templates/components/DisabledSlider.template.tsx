import React from "react";
import DisabledSlider from "../../../React-UI-Collection/src/components/ui/sliders/DisabledSlider.tsx";

export default function DisabledSliderTemplate() {
  return <DisabledSlider value={"50"} min={"0"} max={"100"} step={"1"} label={"Disabled Setting"} reason={"This setting is currently unavailable"} className={""}>DisabledSlider</DisabledSlider>;
}
