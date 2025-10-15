import React from "react";
import UploadWithProgress from "../../../React-UI-Collection/src/components/ui/uploads/UploadWithProgress.tsx";

export default function UploadWithProgressTemplate() {
  return <UploadWithProgress label={"Upload files with progress"} multiple={"true"} disabled={"false"} simulateUpload={"true"} uploadDuration={"3000"} className={""}>UploadWithProgress</UploadWithProgress>;
}
