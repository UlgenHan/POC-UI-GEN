import React from "react";
import RoundedImage from "../../../React-UI-Collection/src/components/ui/images/RoundedImage.tsx";

export default function RoundedImageTemplate() {
  return <RoundedImage width={"w-full"} height={"h-auto"} rounded={"lg"} objectFit={"cover"} loading={"lazy"} className={""}>RoundedImage</RoundedImage>;
}
