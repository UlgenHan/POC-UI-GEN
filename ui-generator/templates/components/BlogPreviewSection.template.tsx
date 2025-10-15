import React from "react";
import BlogPreviewSection from "../../../React-UI-Collection/src/components/layout/sections/BlogPreviewSection.tsx";

export default function BlogPreviewSectionTemplate() {
  return <BlogPreviewSection layout={"grid"} columns={"3"} showExcerpt={"true"} showAuthor={"true"} showReadTime={"true"} showCategory={"true"} showTags={"false"} backgroundColor={"white"} className={""}>BlogPreviewSection</BlogPreviewSection>;
}
