import React, { useEffect, useState } from 'react'
import { useBuilderStore } from '../state/useBuilderStore'

const Inspector = () => {
  const editor = useBuilderStore(state => state.editor)

  const [component, setComponent] = useState(null)

  // Local editable state (NOT applied automatically)
  const [text, setText] = useState('')
  const [styles, setStyles] = useState({})

  /* ================= TRACK SELECTED COMPONENT ================= */

  useEffect(() => {
    if (!editor) return

    const onSelect = () => {
      const selected = editor.getSelected()
      setComponent(selected || null)

      if (selected) {
        setText(selected.get('content') || '')
        setStyles(selected.getStyle() || {})
      }
    }

    editor.on('component:selected', onSelect)

    return () => {
      editor.off('component:selected', onSelect)
    }
  }, [editor])

  if (!component) {
    return (
      <div className="p-4 text-sm text-gray-500 border-l bg-white">
        Select an element to edit
      </div>
    )
  }

  const type = component.get('type')

  /* ================= APPLY HANDLERS ================= */

  const applyChanges = () => {
    // Apply text
    if (type !== 'image') {
      component.set('content', text)
    }

    // Apply styles
    component.addStyle(styles)
  }

  /* ================= UI ================= */

  return (
    <div className="p-4 space-y-6 border-l bg-white w-[280px]">

      <h3 className="font-semibold text-gray-900">
        Inspector
      </h3>

      {/* ================= TEXT ================= */}
      {(type === 'text' || type === 'link' || type === 'button') && (
        <div>
          <label className="block text-sm mb-1">
            Text Content
          </label>
          <textarea
            className="w-full border rounded px-2 py-1 text-sm"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      )}

      {/* ================= IMAGE ================= */}
      {type === 'image' && (
        <div>
          <label className="block text-sm mb-1">
            Replace Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return

              const reader = new FileReader()
              reader.onload = () => {
                component.set('src', reader.result)
              }
              reader.readAsDataURL(file)
            }}
          />
        </div>
      )}

      {/* ================= STYLES ================= */}
      <div className="space-y-3 border-t pt-4">
        <h4 className="text-sm font-medium">
          Styles
        </h4>

        <div>
          <label className="text-xs block mb-1">
            Text Color
          </label>
          <input
            type="color"
            value={styles.color || '#000000'}
            onChange={(e) =>
              setStyles(s => ({ ...s, color: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="text-xs block mb-1">
            Background
          </label>
          <input
            type="color"
            value={styles['background-color'] || '#ffffff'}
            onChange={(e) =>
              setStyles(s => ({
                ...s,
                'background-color': e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="text-xs block mb-1">
            Font Size (px)
          </label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm"
            value={parseInt(styles['font-size']) || ''}
            onChange={(e) =>
              setStyles(s => ({
                ...s,
                'font-size': `${e.target.value}px`,
              }))
            }
          />
        </div>

        <div>
          <label className="text-xs block mb-1">
            Padding (px)
          </label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm"
            value={parseInt(styles.padding) || ''}
            onChange={(e) =>
              setStyles(s => ({
                ...s,
                padding: `${e.target.value}px`,
              }))
            }
          />
        </div>
      </div>

      {/* ================= APPLY BUTTON ================= */}
      <button
        onClick={applyChanges}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Apply Changes
      </button>
    </div>
  )
}

export default Inspector
