import React from "react";
import FilePreviewUpload from "../../../React-UI-Collection/src/components/ui/uploads/FilePreviewUpload.tsx";

export default function FilePreviewUploadTemplate() {
  return <FilePreviewUpload label={"Upload files with preview"} multiple={"true"} disabled={"false"} maxFiles={"5"} className={""}>FilePreviewUpload</FilePreviewUpload>;
}
