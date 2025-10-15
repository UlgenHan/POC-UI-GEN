import React from "react";
import ContactInfoFooter from "../../../React-UI-Collection/src/components/layout/footers/ContactInfoFooter.tsx";

export default function ContactInfoFooterTemplate() {
  return <ContactInfoFooter companyName={"Your Company"} year={"new Date().getFullYear()"} links={"[]"} bgColor={"bg-white"} className={""}>ContactInfoFooter</ContactInfoFooter>;
}
