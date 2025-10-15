import React from 'react';
import { PrimaryButton } from '../../React-UI-Collection/src/components/ui/buttons/PrimaryButton';

export default function ButtonTemplate() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Button Component</h3>
      <div className="flex flex-wrap gap-4">
        <PrimaryButton size="sm" onClick={() => console.log('Small button clicked')}>
          Small Button
        </PrimaryButton>
        <PrimaryButton size="md" onClick={() => console.log('Medium button clicked')}>
          Medium Button
        </PrimaryButton>
        <PrimaryButton size="lg" onClick={() => console.log('Large button clicked')}>
          Large Button
        </PrimaryButton>
        <PrimaryButton disabled>
          Disabled Button
        </PrimaryButton>
      </div>
    </div>
  );
}
