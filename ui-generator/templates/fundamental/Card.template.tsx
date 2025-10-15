import React from 'react';
import BasicCard from '../../React-UI-Collection/src/components/ui/cards/BasicCard';

export default function CardTemplate() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Card Component</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BasicCard
          title="Basic Card"
          description="This is a basic card with default styling"
          padding="md"
          shadow="md"
          rounded="lg"
        >
          <p className="text-sm text-gray-600">Card content goes here</p>
        </BasicCard>
        
        <BasicCard
          title="Compact Card"
          description="A smaller card with compact padding"
          padding="sm"
          shadow="sm"
          rounded="md"
          backgroundColor="gray-50"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
        </BasicCard>
        
        <BasicCard
          title="Interactive Card"
          description="Click me to see the interaction"
          padding="lg"
          shadow="lg"
          rounded="xl"
          onClick={() => alert('Card clicked!')}
        >
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            Action Button
          </button>
        </BasicCard>
      </div>
    </div>
  );
}
