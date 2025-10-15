import React from "react";
import GalleryImage from "../../../React-UI-Collection/src/components/ui/images/GalleryImage.tsx";

export default function GalleryImageTemplate() {
  return <GalleryImage width={"w-full"} height={"h-64"} rounded={"lg"} objectFit={"cover"} loading={"lazy"} showZoomIcon={"true"} className={""}>GalleryImage</GalleryImage>;
}
