import React from "react";
import AlertModal from "../../../React-UI-Collection/src/components/ui/modals/AlertModal.tsx";

export default function AlertModalTemplate() {
  return <AlertModal type={"info"} buttonText={"OK"} autoClose={"false"} autoCloseDelay={"3000"} showCloseButton={"true"} className={""}>AlertModal</AlertModal>;
}
