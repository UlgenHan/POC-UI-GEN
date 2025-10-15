import React from "react";
import OverlayLoader from "../../../React-UI-Collection/src/components/ui/loaders/OverlayLoader.tsx";

export default function OverlayLoaderTemplate() {
  return <OverlayLoader show={"true"} text={"Loading..."} spinnerSize={"lg"} backgroundColor={"bg-white bg-opacity-80"} className={""}>OverlayLoader</OverlayLoader>;
}
