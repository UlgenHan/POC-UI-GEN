import React from "react";
import AspectRatioImage from "../../../React-UI-Collection/src/components/ui/images/AspectRatioImage.tsx";

export default function AspectRatioImageTemplate() {
  return <AspectRatioImage aspectRatio={"video"} width={"w-full"} rounded={"lg"} objectFit={"cover"} loading={"lazy"} className={""}>AspectRatioImage</AspectRatioImage>;
}
