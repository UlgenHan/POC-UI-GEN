import React from "react";
import SearchableMenu from "../../../React-UI-Collection/src/components/ui/menus/SearchableMenu.tsx";

export default function SearchableMenuTemplate() {
  return <SearchableMenu placeholder={"Search..."} emptyMessage={"No results found"} maxHeight={"max-h-64"} position={"left"} className={""}>SearchableMenu</SearchableMenu>;
}
