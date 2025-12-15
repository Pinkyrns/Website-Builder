// src/builder/components/Inspector.jsx - SIMPLE WORKING VERSION
import React, { useState } from 'react'

const Inspector = () => {
  const [activeTab, setActiveTab] = useState('properties')
  const [selectedElement, setSelectedElement] = useState(null)

  // Mock element data
  const elementData = {
    id: 'sample-1',
    type: 'text',
    name: 'Heading Text',
    properties: {
      text: 'Welcome to My Website',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#111827',
      alignment: 'center'
    }
  }

  const propertyGroups = [
    {
      name: 'Typography',
      properties: [
        { label: 'Font Size', value: elementData.properties.fontSize, type: 'text' },
        { label: 'Font Weight', value: elementData.properties.fontWeight, type: 'text' },
        { label: 'Color', value: elementData.properties.color, type: 'color' },
        { label: 'Alignment', value: elementData.properties.alignment, type: 'text' }
      ]
    },
    {
      name: 'Layout',
      properties: [
        { label: 'Width', value: '100%', type: 'text' },
        { label: 'Height', value: 'auto', type: 'text' },
        { label: 'Margin', value: '0px', type: 'text' },
        { label: 'Padding', value: '0px', type: 'text' }
      ]
    }
  ]

  return (
    <div className="h-full flex flex-col border-l border-gray-200 bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {['properties', 'layers', 'assets'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Element Info */}
            <div className="p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">T</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {elementData.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {elementData.type.toUpperCase()} • Click to select
                  </p>
                </div>
              </div>
            </div>

            {/* Property Groups */}
            {propertyGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  {group.name}
                </h4>
                
                <div className="space-y-3">
                  {group.properties.map((property, propIndex) => (
                    <div key={propIndex} className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600">
                        {property.label}
                      </label>
                      {property.type === 'color' ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={property.value}
                            className="w-8 h-8 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={property.value}
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={property.value}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Apply Changes
                </button>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 mb-4">Page Layers</h3>
            
            {[
              { name: 'Header Section', type: 'section' },
              { name: 'Hero Title', type: 'heading' },
              { name: 'Hero Subtitle', type: 'text' },
              { name: 'Features Section', type: 'section' }
            ].map((layer, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  selectedElement === layer.name
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedElement(layer.name)}
              >
                <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                  <span className="text-xs">
                    {layer.type === 'heading' && 'H'}
                    {layer.type === 'text' && 'T'}
                    {layer.type === 'section' && 'S'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{layer.name}</div>
                  <div className="text-xs text-gray-600">{layer.type}</div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  ⋮
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Media Library</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-2xl mb-2">📁</div>
              <p className="text-sm text-gray-600">
                Drop images here or click to upload
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center"
                >
                  <span className="text-gray-400">Image {i}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inspector