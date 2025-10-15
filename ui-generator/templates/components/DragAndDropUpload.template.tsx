import React from "react";
import DragAndDropUpload from "../../../React-UI-Collection/src/components/ui/uploads/DragAndDropUpload.tsx";

export default function DragAndDropUploadTemplate() {
  return <DragAndDropUpload label={"Drop files here or click to upload"} multiple={"false"} disabled={"false"} maxSize={"10"} className={""}>DragAndDropUpload</DragAndDropUpload>;
}
