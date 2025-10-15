import React from "react";
import NewsletterFooter from "../../../React-UI-Collection/src/components/layout/footers/NewsletterFooter.tsx";

export default function NewsletterFooterTemplate() {
  return <NewsletterFooter companyName={"Your Company"} year={"new Date().getFullYear()"} bgColor={"bg-white"} className={""}>NewsletterFooter</NewsletterFooter>;
}
