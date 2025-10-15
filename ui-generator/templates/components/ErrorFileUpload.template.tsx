import React from "react";
import ErrorFileUpload from "../../../React-UI-Collection/src/components/ui/uploads/ErrorFileUpload.tsx";

export default function ErrorFileUploadTemplate() {
  return <ErrorFileUpload label={"Upload files"} multiple={"false"} disabled={"false"} required={"false"} maxSize={"5"} maxFiles={"5"} allowedTypes={"[]"} className={""}>ErrorFileUpload</ErrorFileUpload>;
}
