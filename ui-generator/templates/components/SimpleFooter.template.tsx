import React from "react";
import SimpleFooter from "../../../React-UI-Collection/src/components/layout/footers/SimpleFooter.tsx";

export default function SimpleFooterTemplate() {
  return <SimpleFooter companyName={"Your Company"} year={"new Date().getFullYear()"} bgColor={"bg-white"} textColor={"text-gray-600"} className={""}>SimpleFooter</SimpleFooter>;
}
