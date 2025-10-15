import React from "react";
import SearchBarWithSuggestions from "../../../React-UI-Collection/src/components/ui/inputs/search/SearchBarWithSuggestions.tsx";

export default function SearchBarWithSuggestionsTemplate() {
  return <SearchBarWithSuggestions placeholder={"Search..."} suggestions={"[]"} maxSuggestions={"5"} showCategories={"false"} className={""}>SearchBarWithSuggestions</SearchBarWithSuggestions>;
}
