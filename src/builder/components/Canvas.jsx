// src/builder/components/Canvas.jsx - SIMPLE WORKING VERSION
import React, { useState } from 'react'

const Canvas = () => {
  const [scale, setScale] = useState(1)
  const [activeView, setActiveView] = useState('desktop')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const viewportSizes = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' }
  }

  // Sample elements
  const elements = [
    { id: '1', type: 'header', x: 50, y: 50, width: 300, height: 60, content: 'Welcome to My Website' },
    { id: '2', type: 'text', x: 50, y: 150, width: 400, height: 100, content: 'This is a sample paragraph.' },
    { id: '3', type: 'button', x: 50, y: 280, width: 120, height: 40, content: 'Click Me' }
  ]

  const handleZoomIn = () => {
    setScale(prev => Math.min(3, prev + 0.1))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.25, prev - 0.1))
  }

  const handleResetZoom = () => {
    setScale(1)
  }

  const renderElement = (element) => {
    return (
      <div
        key={element.id}
        style={{
          position: 'absolute',
          left: `${element.x}px`,
          top: `${element.y}px`,
          width: `${element.width}px`,
          height: `${element.height}px`,
        }}
        className="cursor-move select-none"
      >
        {element.type === 'header' && (
          <div className="text-2xl font-bold text-gray-900">
            {element.content}
          </div>
        )}
        {element.type === 'text' && (
          <div className="text-gray-700">
            {element.content}
          </div>
        )}
        {element.type === 'button' && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {element.content}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Canvas Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.25}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            -
          </button>
          
          <button
            onClick={handleResetZoom}
            className="p-1.5 hover:bg-gray-100 rounded"
          >
            {Math.round(scale * 100)}%
          </button>
          
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            +
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
            <button
              onClick={() => setActiveView('desktop')}
              className={`px-3 py-1 rounded text-sm ${
                activeView === 'desktop'
                  ? 'bg-white text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setActiveView('tablet')}
              className={`px-3 py-1 rounded text-sm ${
                activeView === 'tablet'
                  ? 'bg-white text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tablet
            </button>
            <button
              onClick={() => setActiveView('mobile')}
              className={`px-3 py-1 rounded text-sm ${
                activeView === 'mobile'
                  ? 'bg-white text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mobile
            </button>
          </div>
          
          {/* Preview Toggle */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-1 rounded text-sm ${
              isPreviewMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 overflow-hidden relative">
        {/* Canvas */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Viewport Frame */}
          <div
            className="border-2 border-gray-300 bg-white shadow-lg overflow-hidden"
            style={{
              width: viewportSizes[activeView].width,
              height: viewportSizes[activeView].height,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {/* Canvas Content */}
            <div className="w-full h-full relative">
              {/* Grid Background */}
              {!isPreviewMode && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
              
              {/* Elements */}
              {elements.map(renderElement)}
              
              {/* Drop Zone Highlight */}
              {!isPreviewMode && (
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-transparent hover:border-blue-300" />
              )}
            </div>
          </div>
        </div>

        {/* Viewport Label */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur border border-gray-200">
          <div className="flex items-center gap-2">
            {activeView === 'desktop' && '🖥️'}
            {activeView === 'tablet' && '📱'}
            {activeView === 'mobile' && '📱'}
            <span className="text-sm font-medium capitalize">{activeView}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canvas