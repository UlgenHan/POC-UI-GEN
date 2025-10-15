import React from "react";
import FramedImage from "../../../React-UI-Collection/src/components/ui/images/FramedImage.tsx";

export default function FramedImageTemplate() {
  return <FramedImage width={"w-full"} height={"h-64"} frameWidth={"medium"} frameColor={"border-gray-300"} framePadding={"md"} frameStyle={"solid"} rounded={"lg"} objectFit={"cover"} shadow={"true"} loading={"lazy"} className={""}>FramedImage</FramedImage>;
}
