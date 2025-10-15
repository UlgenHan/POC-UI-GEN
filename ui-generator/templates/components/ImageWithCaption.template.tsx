import React from "react";
import ImageWithCaption from "../../../React-UI-Collection/src/components/ui/images/ImageWithCaption.tsx";

export default function ImageWithCaptionTemplate() {
  return <ImageWithCaption width={"w-full"} height={"h-64"} rounded={"lg"} objectFit={"cover"} captionPosition={"bottom"} captionSize={"md"} loading={"lazy"} className={""}>ImageWithCaption</ImageWithCaption>;
}
