import React from "react";
import ExpandableCard from "../../../React-UI-Collection/src/components/ui/cards/ExpandableCard.tsx";

export default function ExpandableCardTemplate() {
  return <ExpandableCard defaultExpanded={"false"} expandButtonText={"Show more"} collapseButtonText={"Show less"} animationDuration={"normal"} showToggleIcon={"true"} className={""}>ExpandableCard</ExpandableCard>;
}
