import React from "react";
import FileTypeRestrictedUpload from "../../../React-UI-Collection/src/components/ui/uploads/FileTypeRestrictedUpload.tsx";

export default function FileTypeRestrictedUploadTemplate() {
  return <FileTypeRestrictedUpload fileType={"images"} customAccept={""} customTypes={"[]"} multiple={"false"} disabled={"false"} required={"false"} maxSize={"10"} className={""}>FileTypeRestrictedUpload</FileTypeRestrictedUpload>;
}
