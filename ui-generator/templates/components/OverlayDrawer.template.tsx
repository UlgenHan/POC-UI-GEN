import React from "react";
import OverlayDrawer from "../../../React-UI-Collection/src/components/ui/drawers/OverlayDrawer.tsx";

export default function OverlayDrawerTemplate() {
  return <OverlayDrawer position={"right"} size={"position === left || position === right ? w-80 : h-80"} className={""}>OverlayDrawer</OverlayDrawer>;
}
