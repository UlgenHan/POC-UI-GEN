import React from "react";
import PrimaryButtonTemplate from "../templates/components/PrimaryButton.template";
import BasicCardTemplate from "../templates/components/BasicCard.template";
import BasicInputTemplate from "../templates/components/BasicInput.template";

export default function SamplePage() {
  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Generated Demo Page</h1>
      <PrimaryButtonTemplate />
      <BasicCardTemplate />
      <BasicInputTemplate />
    </div>
  );
}
