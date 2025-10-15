import React, { useState } from 'react';
import BasicInput from '../../React-UI-Collection/src/components/ui/inputs/BasicInput';

export default function InputTemplate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    message: ''
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Input Component</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <BasicInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange('name')}
            required
          />
          
          <BasicInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
          />
          
          <BasicInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
          />
        </div>
        
        <div className="space-y-4">
          <BasicInput
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />
          
          <BasicInput
            label="Input with Error"
            placeholder="This input has an error"
            error="This field is required"
          />
          
          <BasicInput
            placeholder="Input without label"
            value={formData.message}
            onChange={handleInputChange('message')}
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Form Data:</h4>
        <pre className="text-sm text-gray-600">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
