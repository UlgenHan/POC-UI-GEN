import React from "react";
import LargeFileUpload from "../../../React-UI-Collection/src/components/ui/uploads/LargeFileUpload.tsx";

export default function LargeFileUploadTemplate() {
  return <LargeFileUpload label={"Upload large files"} multiple={"false"} disabled={"false"} maxSize={"100"} 100MB={"5"} 5MB={"true"} className={""}>LargeFileUpload</LargeFileUpload>;
}
