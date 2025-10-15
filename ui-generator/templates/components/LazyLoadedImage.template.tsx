import React from "react";
import LazyLoadedImage from "../../../React-UI-Collection/src/components/ui/images/LazyLoadedImage.tsx";

export default function LazyLoadedImageTemplate() {
  return <LazyLoadedImage width={"w-full"} height={"h-64"} rounded={"lg"} objectFit={"cover"} threshold={"0.1"} className={""}>LazyLoadedImage</LazyLoadedImage>;
}
