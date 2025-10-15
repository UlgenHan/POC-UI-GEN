import React, { useState } from 'react';
import ButtonTemplate from '../templates/fundamental/Button.template';
import CardTemplate from '../templates/fundamental/Card.template';
import InputTemplate from '../templates/fundamental/Input.template';

export default function FundamentalDemo() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Components', icon: '🧩' },
    { id: 'button', label: 'Buttons', icon: '🔘' },
    { id: 'card', label: 'Cards', icon: '🃏' },
    { id: 'input', label: 'Inputs', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fundamental Components Demo</h1>
              <p className="mt-2 text-gray-600">
                Interactive showcase of Button, Card, and Input components
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Templates Generated
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                🧪 Tests Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* All Components View */}
          {activeTab === 'all' && (
            <div className="space-y-12">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Component Showcase</h2>
                <div className="space-y-8">
                  <ButtonTemplate />
                  <div className="border-t pt-8">
                    <CardTemplate />
                  </div>
                  <div className="border-t pt-8">
                    <InputTemplate />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Individual Component Views */}
          {activeTab === 'button' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ButtonTemplate />
            </div>
          )}

          {activeTab === 'card' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CardTemplate />
            </div>
          )}

          {activeTab === 'input' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <InputTemplate />
            </div>
          )}
        </div>

        {/* Footer with Component Stats */}
        <footer className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Fundamental Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-sm text-gray-600">Component Variants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Tailwind Preserved</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
