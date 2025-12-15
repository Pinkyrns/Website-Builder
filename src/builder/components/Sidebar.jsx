// src/builder/components/Sidebar.jsx - SAFE VERSION
import React, { useState } from 'react'
import { Icons } from '../../components/Icons/Icons.jsx'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('elements')
  const [searchQuery, setSearchQuery] = useState('')

  // Use only icons that we know exist
  const tabs = [
    { id: 'elements', label: 'Elements', icon: Icons.Box || (() => <span>📦</span>) },
    { id: 'templates', label: 'Templates', icon: Icons.LayoutGrid || (() => <span>📐</span>) },
    { id: 'assets', label: 'Assets', icon: Icons.Folder || (() => <span>📁</span>) },
    { id: 'pages', label: 'Pages', icon: Icons.File || (() => <span>📄</span>) }
  ]

  // Element categories with safe icons
  const elementCategories = [
    {
      id: 'basic',
      name: 'Basic',
      elements: [
        { id: 'text', name: 'Text', icon: Icons.Type || (() => <span>📝</span>), description: 'Add text content' },
        { id: 'heading', name: 'Heading', icon: Icons.Type || (() => <span>🔤</span>), description: 'Add headings' },
        { id: 'button', name: 'Button', icon: Icons.Square || (() => <span>🔘</span>), description: 'Interactive button' },
        { id: 'image', name: 'Image', icon: Icons.Image || (() => <span>🖼️</span>), description: 'Add images' },
        { id: 'divider', name: 'Divider', icon: Icons.Minus || (() => <span>➖</span>), description: 'Horizontal line' }
      ]
    },
    {
      id: 'layout',
      name: 'Layout',
      elements: [
        { id: 'container', name: 'Container', icon: Icons.Box || (() => <span>📦</span>), description: 'Content container' },
        { id: 'section', name: 'Section', icon: Icons.Square || (() => <span>⬜</span>), description: 'Page section' },
        { id: 'columns', name: 'Columns', icon: Icons.Columns || (() => <span>📊</span>), description: 'Multi-column' }
      ]
    }
  ]

  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Tabs - SAFE */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            🔍
          </div>
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'elements' && (
          <div className="space-y-6">
            {elementCategories.map((category) => (
              <div key={category.id} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.elements.map((element) => {
                    const Icon = element.icon
                    return (
                      <div
                        key={element.id}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-move transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title={element.description}
                      >
                        <Icon className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-center text-gray-900 dark:text-white font-medium">
                          {element.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">Templates coming soon</p>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">Media library coming soon</p>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">Pages manager coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar