import React from "react";
import MultiFileUpload from "../../../React-UI-Collection/src/components/ui/uploads/MultiFileUpload.tsx";

export default function MultiFileUploadTemplate() {
  return <MultiFileUpload label={"Select multiple files"} disabled={"false"} maxFiles={"10"} maxSize={"5"} className={""}>MultiFileUpload</MultiFileUpload>;
}
