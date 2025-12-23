// import React, { useState } from 'react'
// import { useBuilderStore } from '../state/useBuilderStore'

// const CodeEditor = () => {
//   const { pages, currentPage, updatePageCode } = useBuilderStore()
//   const page = pages.find(p => p.id === currentPage)

//   const [tab, setTab] = useState('html')

//   return (
//     <div className="h-full flex flex-col bg-gray-900">
//       <div className="flex gap-2 p-2">
//         {['html','css','js'].map(t => (
//           <button key={t} onClick={() => setTab(t)}>{t}</button>
//         ))}
//       </div>
//       <textarea
//         className="flex-1 bg-black text-white p-4"
//         value={page[tab]}
//         onChange={(e) => updatePageCode(tab, e.target.value)}
//       />
//     </div>
//   )
// }

// export default CodeEditor



import React, { useState, useEffect } from 'react'
import { useBuilderStore } from '../state/useBuilderStore'

const CodeEditor = () => {
  const {
    pages,
    currentPage,
    updatePageCode,
    editor,
  } = useBuilderStore()

  const page = pages.find(p => p.id === currentPage)
  const [tab, setTab] = useState('html')
  const [value, setValue] = useState('')

  /* ---------------- SYNC FROM STATE ---------------- */

  useEffect(() => {
    if (!page) return
    setValue(page[tab] || '')
  }, [page, tab])

  /* ---------------- APPLY TO GRAPESJS ---------------- */

  const applyChanges = (val) => {
    if (!editor) return

    if (tab === 'html') {
      editor.setComponents(val)
    }

    if (tab === 'css') {
      editor.setStyle(val)
    }

    // JS is stored only (not executed inside editor)
    updatePageCode(tab, val)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Tabs */}
      <div className="flex gap-2 p-2 border-b border-gray-700">
        {['html', 'css', 'js'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded text-sm ${
              tab === t ? 'bg-gray-700' : 'bg-gray-800'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        className="flex-1 bg-black text-white p-4 font-mono text-sm outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          applyChanges(e.target.value)
        }}
      />
    </div>
  )
}

export default CodeEditor
