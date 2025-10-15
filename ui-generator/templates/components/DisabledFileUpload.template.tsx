import React from "react";
import DisabledFileUpload from "../../../React-UI-Collection/src/components/ui/uploads/DisabledFileUpload.tsx";

export default function DisabledFileUploadTemplate() {
  return <DisabledFileUpload label={"File Upload"} placeholder={"File upload not available"} reason={"This field is currently disabled"} className={""}>DisabledFileUpload</DisabledFileUpload>;
}
