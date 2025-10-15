import React from "react";
import ConfirmationModal from "../../../React-UI-Collection/src/components/ui/modals/ConfirmationModal.tsx";

export default function ConfirmationModalTemplate() {
  return <ConfirmationModal confirmText={"Confirm"} cancelText={"Cancel"} variant={"danger"} loading={"false"} className={""}>ConfirmationModal</ConfirmationModal>;
}
