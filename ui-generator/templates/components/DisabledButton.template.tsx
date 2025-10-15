import React from "react";
import DisabledButton from "../../../React-UI-Collection/src/components/ui/buttons/DisabledButton.tsx";

export default function DisabledButtonTemplate() {
  return <DisabledButton variant={"primary"} size={"md"} reason={"This action is currently unavailable"} className={""}>DisabledButton</DisabledButton>;
}
