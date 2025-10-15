import React from "react";
import DisabledDatePicker from "../../../React-UI-Collection/src/components/ui/date-pickers/DisabledDatePicker.tsx";

export default function DisabledDatePickerTemplate() {
  return <DisabledDatePicker value={""} placeholder={"Date not available"} helperText={"This field is currently disabled"} className={""}>DisabledDatePicker</DisabledDatePicker>;
}
