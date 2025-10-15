import React from "react";
import getCartItemsWithProducts from "../../../React-UI-Collection/src/modules/ecommerce/store.ts";

export default function getCartItemsWithProductsTemplate() {
  return <getCartItemsWithProducts quantity={">\r\n        set((state) => {\r\n          const existing = state.cart.find((item) => item.productId === productId);\r\n          if (existing) {\r\n            return {\r\n              cart: state.cart.map((item) =>\r\n                item.productId === productId\r\n                  ? { ...item"}>getCartItemsWithProducts</getCartItemsWithProducts>;
}
