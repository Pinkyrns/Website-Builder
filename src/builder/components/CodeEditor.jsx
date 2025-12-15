// src/builder/components/CodeEditor.jsx - SIMPLE VERSION (NO CODEMIRROR)
import React, { useState } from 'react'
import { Icons } from '../../components/Icons/Icons.jsx'
import { cn } from '../../utils/index.js'
import { useBuilderStore } from '../state/useBuilderStore.js'

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('html')
  const { isPreviewMode, toggleCodeEditor } = useBuilderStore()

  // Sample code
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>My Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome</h1>
</body>
</html>`)

  const [cssCode, setCssCode] = useState(`body {
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}`)

  const [jsCode, setJsCode] = useState(`console.log('Hello World');`)

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return htmlCode
      case 'css': return cssCode
      case 'js': return jsCode
      default: return ''
    }
  }

  const setCurrentCode = (value) => {
    switch (activeTab) {
      case 'html': setHtmlCode(value); break
      case 'css': setCssCode(value); break
      case 'js': setJsCode(value); break
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {['html', 'css', 'js'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 rounded text-sm font-medium",
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCodeEditor}
            className="p-2 text-gray-400 hover:text-white"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <textarea
          value={getCurrentCode()}
          onChange={(e) => setCurrentCode(e.target.value)}
          className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default CodeEditor